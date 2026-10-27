// Woody Polymarket — Cloudflare Pages Function serving /api/*.
// Accounts, sessions and every document live in a D1 database bound as DB.
// Same API and permissions as server.js (the local test server).
// Owner: the OWNER_USERNAME environment variable, else "derekv".

const USERNAME_RE = /^[a-z0-9_-]{3,20}$/;
const ID_RE = /^[\w-]{1,100}$/;
const COOKIE = "woody_session";
const SESSION_DAYS = 30;
const PBKDF2_ITER = 100000; // the most Workers allows
const MEMBER_STATUSES = ["approved", "rejected", "removed"];

const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, uid TEXT UNIQUE NOT NULL, salt TEXT NOT NULL, hash TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, uid TEXT NOT NULL, expires INTEGER NOT NULL)",
  "CREATE TABLE IF NOT EXISTS docs (path TEXT PRIMARY KEY, data TEXT NOT NULL, ver INTEGER NOT NULL)",
  "CREATE INDEX IF NOT EXISTS docs_ver ON docs (ver)"
];
let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch(SCHEMA.map(s => db.prepare(s)));
  schemaReady = true;
}

// ---------- helpers ----------
const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });
const fail = (status, code, error) => json(status, { code, error });
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
const randomHex = n => hex(crypto.getRandomValues(new Uint8Array(n)));
async function hashPw(pw, salt) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations: PBKDF2_ITER }, key, 256);
  return hex(bits);
}
function sameString(a, b) {
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
const changedKeys = (prev, next) => Object.keys({ ...prev, ...next }).filter(k => JSON.stringify(prev[k]) !== JSON.stringify(next[k]));
const sessionToken = req => (/(?:^|;\s*)woody_session=([a-f0-9]+)/.exec(req.headers.get("Cookie") || "") || [])[1] || null;
const cookie = (token, maxAge) => `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;

// ---------- storage ----------
async function getDoc(db, path) {
  const r = await db.prepare("SELECT data FROM docs WHERE path = ?").bind(path).first();
  return r ? JSON.parse(r.data) : undefined;
}
const putDoc = (db, path, data) => db.prepare(
  "INSERT INTO docs (path, data, ver) VALUES (?1, ?2, (SELECT COALESCE(MAX(ver), 0) + 1 FROM docs)) " +
  "ON CONFLICT(path) DO UPDATE SET data = excluded.data, ver = excluded.ver").bind(path, JSON.stringify(data));

// Who the caller is, and what that makes them. Loaded once per request.
async function loadCaller(db, uid, owner) {
  if (!uid) return { uid: null, name: null, owner: false, member: false, mod: false, modIds: [] };
  const u = await db.prepare("SELECT name FROM users WHERE uid = ?").bind(uid).first();
  const name = u?.name || null;
  const isOwner = !!name && name === owner;
  const [me, mods] = await Promise.all([getDoc(db, "members/" + uid), getDoc(db, "admin/mods")]);
  const modIds = mods?.ids || [];
  const member = isOwner || me?.status === "approved";
  return { uid, name, owner: isOwner, member, mod: isOwner || (member && modIds.includes(uid)), modIds };
}

// ---------- permissions (same as server.js) ----------
async function allowed(db, c, p, prev, next) {
  const [col, id] = p.split("/");
  if (col === "profiles") return id === c.uid;
  if (col === "members") {
    if (c.owner) return true;
    if (!prev) return id === c.uid && next.status === "pending"
      && Object.keys(next).every(k => ["status", "name", "requestedAt"].includes(k));
    // Moderators decide on players, but not on themselves, other moderators or the owner.
    return c.mod && id !== c.uid && !prev.owner && !c.modIds.includes(id)
      && MEMBER_STATUSES.includes(next.status)
      && changedKeys(prev, next).every(k => ["status", "decidedAt", "decidedBy"].includes(k));
  }
  if (!c.member) return false;
  if (col === "admin") return c.owner;
  if (col === "bets") return id === c.uid;
  if (col !== "markets") return false;
  if (c.mod) return true;
  if (!prev) {
    const approvalOff = (await getDoc(db, "admin/config"))?.requireApproval === false;
    return next.creator === c.uid && (next.status === "pending" || (next.status === "open" && approvalOff));
  }
  return prev.creator === c.uid && prev.status === "open" && Date.now() >= prev.closeAt
    && next.status === "resolved" && changedKeys(prev, next).every(k => k === "status" || k === "resolution");
}

// ---------- api ----------
export async function onRequest({ request, env, params }) {
  const db = env.DB;
  if (!db) return fail(500, "not-configured", "No D1 database is bound as DB. See the README.");
  await ensureSchema(db);
  const owner = (env.OWNER_USERNAME || "derekv").toLowerCase();
  const route = [].concat(params.route || []).join("/");
  const url = new URL(request.url);

  const token = sessionToken(request);
  let uid = null;
  if (token) {
    const s = await db.prepare("SELECT uid FROM sessions WHERE token = ? AND expires > ?").bind(token, Date.now()).first();
    uid = s?.uid || null;
  }

  if (request.method === "GET" && route === "me") {
    if (!uid) return json(200, { uid: null });
    const c = await loadCaller(db, uid, owner);
    return json(200, { uid, name: c.name, isOwner: c.owner });
  }

  // Changes since a version number. Members see everything; others only their own membership record.
  if (request.method === "GET" && route === "sync") {
    if (!uid) return fail(401, "permission-denied", "Sign in first.");
    const c = await loadCaller(db, uid, owner);
    const since = Math.max(0, Number(url.searchParams.get("since")) || 0);
    const top = await db.prepare("SELECT COALESCE(MAX(ver), 0) AS v FROM docs").first();
    const rows = c.member
      ? (await db.prepare("SELECT path, data FROM docs WHERE ver > ?").bind(since).all()).results
      : (await db.prepare("SELECT path, data FROM docs WHERE ver > ? AND path = ?").bind(since, "members/" + uid).all()).results;
    const docs = {};
    for (const r of rows) docs[r.path] = JSON.parse(r.data);
    return json(200, { ver: top.v, docs });
  }

  if (request.method !== "POST") return fail(404, "not-found", "No such endpoint.");
  if (!(request.headers.get("Content-Type") || "").startsWith("application/json")) return fail(415, "invalid-argument", "Send JSON.");
  let body;
  try { body = await request.json(); } catch { return fail(400, "invalid-argument", "bad-json"); }

  if (route === "signup" || route === "login") {
    const name = String(body.username || "").trim().toLowerCase(), pw = String(body.password || "");
    let userId;
    if (route === "signup") {
      if (!USERNAME_RE.test(name)) return fail(400, "auth/invalid-email", "Bad username.");
      if (pw.length < 6) return fail(400, "auth/weak-password", "Password too short.");
      const salt = randomHex(16);
      userId = randomHex(14);
      const ins = await db.prepare("INSERT INTO users (name, uid, salt, hash) VALUES (?, ?, ?, ?) ON CONFLICT(name) DO NOTHING")
        .bind(name, userId, salt, await hashPw(pw, salt)).run();
      if (!ins.meta.changes) return fail(409, "auth/email-already-in-use", "Username taken.");
      const now = Date.now();
      await db.batch([
        putDoc(db, "profiles/" + userId, { name, photo: "" }),
        putDoc(db, "members/" + userId, name === owner
          ? { status: "approved", owner: true, name, requestedAt: now }
          : { status: "pending", name, requestedAt: now })
      ]);
    } else {
      const u = await db.prepare("SELECT uid, salt, hash FROM users WHERE name = ?").bind(name).first();
      if (!u || !sameString(await hashPw(pw, u.salt), u.hash)) return fail(401, "auth/invalid-credential", "Wrong username or password.");
      userId = u.uid;
    }
    const tok = randomHex(24);
    await db.batch([
      db.prepare("DELETE FROM sessions WHERE expires <= ?").bind(Date.now()),
      db.prepare("INSERT INTO sessions (token, uid, expires) VALUES (?, ?, ?)").bind(tok, userId, Date.now() + SESSION_DAYS * 864e5)
    ]);
    return json(200, { uid: userId }, { "Set-Cookie": cookie(tok, SESSION_DAYS * 86400) });
  }

  if (route === "logout") {
    if (token) await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
    return json(200, {}, { "Set-Cookie": cookie("", 0) });
  }

  if (route === "write") {
    if (!uid) return fail(401, "permission-denied", "Sign in first.");
    const { op, path: p, data: doc } = body;
    const [col, id, extra] = String(p || "").split("/");
    if (!col || !ID_RE.test(id || "") || extra !== undefined || !doc || typeof doc !== "object" || Array.isArray(doc)) {
      return fail(400, "invalid-argument", "Bad write.");
    }
    if (JSON.stringify(doc).length > 1e6) return fail(413, "invalid-argument", "Too large.");
    if (op !== "set" && op !== "update") return fail(400, "invalid-argument", "Unknown op.");
    const prev = await getDoc(db, p);
    if (op === "update" && !prev) return fail(404, "not-found", "No such document.");
    const next = op === "set" ? doc : { ...prev, ...doc };
    const c = await loadCaller(db, uid, owner);
    if (!(await allowed(db, c, p, prev, next))) return fail(403, "permission-denied", "Not allowed.");
    await putDoc(db, p, next).run();
    return json(200, {});
  }
  return fail(404, "not-found", "No such endpoint.");
}
