// Woody Polymarket — local test server. No npm packages needed.
//   node server.js        then open http://localhost:8080
// Serves the site/ folder and keeps accounts and data in local-data.json. Same API and
// permissions as the Cloudflare version in functions/api/[[route]].js.
// Owner: WOODY_OWNER env var, else the first account created.
"use strict";
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || "127.0.0.1";
const SITE = path.join(__dirname, "site");
const DATA_FILE = process.env.WOODY_DATA || path.join(__dirname, "local-data.json");
const USERNAME_RE = /^[a-z0-9_-]{3,20}$/;
const ID_RE = /^[\w-]{1,100}$/;
const COOKIE = "woody_session";
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon"
};

const OWNER = (process.env.WOODY_OWNER || "").toLowerCase() || null;

// ---------- storage ----------
// users: username -> {uid, salt, hash}; sessions: token -> uid; docs: "collection/id" -> object
// vers: "collection/id" -> version number of its last write; seq: the latest version number
let data = { users: {}, sessions: {}, docs: {}, vers: {}, seq: 0, firstUser: null };
try { data = { ...data, ...JSON.parse(fs.readFileSync(DATA_FILE, "utf8")) }; } catch {}
const save = () => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 1));
const putDoc = (p, doc) => { data.docs[p] = doc; data.vers[p] = ++data.seq; };

const nameOf = uid => Object.keys(data.users).find(n => data.users[n].uid === uid) || null;
const isOwner = uid => { const n = nameOf(uid); return !!n && n === (OWNER || data.firstUser); };
// Sign-up approval: members/{uid}.status is pending, approved, rejected or removed.
const isMember = uid => !!uid && (isOwner(uid) || data.docs["members/" + uid]?.status === "approved");
const modIds = () => data.docs["admin/mods"]?.ids || [];
const isMod = uid => isOwner(uid) || (isMember(uid) && modIds().includes(uid));
const canRead = (uid, p) => isMember(uid) || p === "members/" + uid;
const hashPw = (pw, salt) => crypto.scryptSync(pw, salt, 32).toString("hex");
const changedKeys = (prev, next) => Object.keys({ ...prev, ...next }).filter(k => JSON.stringify(prev[k]) !== JSON.stringify(next[k]));
const MEMBER_STATUSES = ["approved", "rejected", "removed"];

// Accounts made before sign-up approval existed keep their access.
let migrated = false;
for (const [name, u] of Object.entries(data.users)) {
  if (data.docs["members/" + u.uid]) continue;
  putDoc("members/" + u.uid, { status: "approved", name, requestedAt: Date.now(), ...(isOwner(u.uid) ? { owner: true } : {}) });
  migrated = true;
}
// Data saved before version numbers existed.
for (const p of Object.keys(data.docs)) if (!data.vers[p]) { data.vers[p] = ++data.seq; migrated = true; }
if (migrated) save();

// ---------- permissions (mirrors firestore.rules) ----------
function allowed(uid, p, prev, next) {
  const [col, id] = p.split("/");
  if (col === "profiles") return id === uid;
  if (col === "members") {
    if (isOwner(uid)) return true;
    if (!prev) return id === uid && next.status === "pending"
      && Object.keys(next).every(k => ["status", "name", "requestedAt"].includes(k));
    // Moderators decide on players, but not on themselves, other moderators or the owner.
    return isMod(uid) && id !== uid && !prev.owner && !modIds().includes(id)
      && MEMBER_STATUSES.includes(next.status)
      && changedKeys(prev, next).every(k => ["status", "decidedAt", "decidedBy"].includes(k));
  }
  if (!isMember(uid)) return false;
  if (col === "admin") return isOwner(uid);
  if (col === "bets") return id === uid;
  if (col !== "markets") return false;
  if (isMod(uid)) return true;
  if (!prev) {
    const approvalOff = data.docs["admin/config"]?.requireApproval === false;
    return next.creator === uid && (next.status === "pending" || (next.status === "open" && approvalOff));
  }
  return prev.creator === uid && prev.status === "open" && Date.now() >= prev.closeAt
    && next.status === "resolved" && changedKeys(prev, next).every(k => k === "status" || k === "resolution");
}

// ---------- http helpers ----------
function json(res, status, body, headers = {}) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers });
  res.end(JSON.stringify(body));
}
const fail = (res, status, code, error) => json(res, status, { code, error });
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []; let n = 0;
    req.on("data", c => { n += c.length; if (n > 1e6) { reject(new Error("too-large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}")); } catch { reject(new Error("bad-json")); } });
  });
}
function sessionToken(req) { return (/(?:^|;\s*)woody_session=([a-f0-9]+)/.exec(req.headers.cookie || "") || [])[1] || null; }
const sessionUid = req => data.sessions[sessionToken(req)] || null;
function startSession(res, uid, body) {
  const token = crypto.randomBytes(24).toString("hex");
  data.sessions[token] = uid; save();
  json(res, 200, body, { "Set-Cookie": `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000` });
}

// ---------- api ----------
async function api(req, res, route, query) {
  const uid = sessionUid(req);
  if (req.method === "GET" && route === "me") {
    return json(res, 200, uid ? { uid, name: nameOf(uid), isOwner: isOwner(uid) } : { uid: null });
  }
  // Changes since a version number. Members see everything; others only their own membership record.
  if (req.method === "GET" && route === "sync") {
    if (!uid) return fail(res, 401, "permission-denied", "Sign in first.");
    const since = Math.max(0, Number(query.get("since")) || 0);
    const docs = Object.fromEntries(Object.entries(data.docs).filter(([p]) => data.vers[p] > since && canRead(uid, p)));
    return json(res, 200, { ver: data.seq, docs });
  }
  if (req.method !== "POST") return fail(res, 404, "not-found", "No such endpoint.");
  if (!(req.headers["content-type"] || "").startsWith("application/json")) return fail(res, 415, "invalid-argument", "Send JSON.");
  let body;
  try { body = await readBody(req); } catch (e) { return fail(res, 400, "invalid-argument", e.message); }

  if (route === "signup" || route === "login") {
    const name = String(body.username || "").trim().toLowerCase(), pw = String(body.password || "");
    if (route === "signup") {
      if (!USERNAME_RE.test(name)) return fail(res, 400, "auth/invalid-email", "Bad username.");
      if (pw.length < 6) return fail(res, 400, "auth/weak-password", "Password too short.");
      if (data.users[name]) return fail(res, 409, "auth/email-already-in-use", "Username taken.");
      const salt = crypto.randomBytes(16).toString("hex"), newUid = crypto.randomBytes(14).toString("hex");
      data.users[name] = { uid: newUid, salt, hash: hashPw(pw, salt) };
      data.firstUser ||= name;
      putDoc("profiles/" + newUid, { name, photo: "" });
      putDoc("members/" + newUid, isOwner(newUid)
        ? { status: "approved", owner: true, name, requestedAt: Date.now() }
        : { status: "pending", name, requestedAt: Date.now() });
      return startSession(res, newUid, { uid: newUid });
    }
    const u = data.users[name];
    const ok = u && crypto.timingSafeEqual(Buffer.from(hashPw(pw, u.salt), "hex"), Buffer.from(u.hash, "hex"));
    if (!ok) return fail(res, 401, "auth/invalid-credential", "Wrong username or password.");
    return startSession(res, u.uid, { uid: u.uid });
  }
  if (route === "logout") {
    delete data.sessions[sessionToken(req)]; save();
    return json(res, 200, {}, { "Set-Cookie": `${COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0` });
  }
  if (route === "write") {
    if (!uid) return fail(res, 401, "permission-denied", "Sign in first.");
    const { op, path: p, data: doc } = body;
    const [col, id, extra] = String(p || "").split("/");
    if (!col || !ID_RE.test(id || "") || extra !== undefined || !doc || typeof doc !== "object" || Array.isArray(doc)) {
      return fail(res, 400, "invalid-argument", "Bad write.");
    }
    const prev = data.docs[p];
    if (op === "update" && !prev) return fail(res, 404, "not-found", "No such document.");
    if (op !== "set" && op !== "update") return fail(res, 400, "invalid-argument", "Unknown op.");
    const next = op === "set" ? doc : { ...prev, ...doc };
    if (!allowed(uid, p, prev, next)) return fail(res, 403, "permission-denied", "Not allowed.");
    putDoc(p, next); save();
    return json(res, 200, {});
  }
  return fail(res, 404, "not-found", "No such endpoint.");
}

// ---------- static files ----------
function serveStatic(req, res, urlPath) {
  let rel;
  try { rel = decodeURIComponent(urlPath); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(SITE, "." + (rel.endsWith("/") ? rel + "index.html" : rel));
  if (!file.startsWith(SITE + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(buf);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost"), urlPath = url.pathname;
  if (urlPath.startsWith("/api/")) {
    return api(req, res, urlPath.slice(5), url.searchParams).catch(e => { console.error(e); if (!res.headersSent) fail(res, 500, "internal", "Server error."); });
  }
  serveStatic(req, res, urlPath);
}).listen(PORT, HOST, () => {
  console.log(`Woody Polymarket (local) running at http://localhost:${PORT}`);
  console.log(OWNER ? `Owner account: "${OWNER}"` : `Owner account: ${data.firstUser ? `"${data.firstUser}"` : "the first account you create"}`);
  console.log(`Data is saved in ${DATA_FILE}`);
});
