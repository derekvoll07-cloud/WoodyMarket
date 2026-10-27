# Hosting Woody Polymarket

This folder is a version of the board you can put on the internet yourself. Anyone with the link picks a username and password and gets free play credits. No email address is needed. You are the only moderator until you promote someone.

It runs on Firebase (Google), which is free at this size:
- **Firebase Hosting** serves the page at `https://<your-project>.web.app`
- **Firestore** stores markets, bets and comments
- **Firebase Authentication** handles usernames and passwords

Setup takes about 20 minutes. You need a Google account and a computer with Node.js installed (https://nodejs.org, the LTS version).

## Trying it on your own computer first

You don't need Firebase for this, only Node.js. Open a terminal in this folder and run:

```
node server.js
```

Then open http://localhost:8080. The first account you create is the owner (or set `ownerUsername` in `site/config.js` first). Everything is saved in `local-data.json` next to `server.js`; delete that file to start over. Press Ctrl+C to stop the server.

To try it with several players, open a second browser (or a private window) and create another account. Changes show up in both windows straight away.

The local server applies the same permissions as `firestore.rules`, but it's for testing only. It isn't built to face the internet.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com and click **Create a project**. Name it something like `woody-polymarket`. You can turn Google Analytics off.
2. In the left menu, open **Build → Authentication → Get started**. Under **Sign-in method**, enable **Email/Password** (leave "Email link" off) and save.
3. Open **Build → Firestore Database → Create database**. Pick the location closest to your players (for example `australia-southeast1` in Sydney), and start in **production mode**.
4. Open **Project settings** (the gear icon) → **Your apps** → click the **</>** (Web) icon. Give it a nickname, leave Hosting unticked, and register it. Firebase shows a `firebaseConfig` block. Keep that page open.

## 2. Fill in your settings

1. Pick the username you'll use as owner: 3–20 lowercase letters, numbers, dashes or underscores, e.g. `derek`.
2. Open `site/config.js`. Paste the values from the `firebaseConfig` block, and put your username in `ownerUsername`.
3. Open `firestore.rules` and replace `YOUR_USERNAME` with the same username, keeping the `@woody.example.com` after it (e.g. `derek@woody.example.com`).

The two must match exactly. That username is what makes you the owner.

## 3. Deploy

Open a terminal in this folder and run:

```
npm install -g firebase-tools
firebase login
firebase use --add          (pick the project you created)
firebase deploy
```

When it finishes, it prints your **Hosting URL**, e.g. `https://woody-polymarket.web.app`. That's the link you share.

## 4. First run

1. Open the link straight away, type your owner username and a password, and press **Create account**. Do this before you share the link, so nobody else can claim your username. You'll see the **Admin** tab.
2. On the empty Markets page, click **Add 6 example markets** if you want a starting set.
3. In **Admin → House settings**, set starting credits, the top-up amount and whether every new market needs approval.

## Who gets in

The board is invite-only. Anyone with the link can create an account, but a new account sees only a "You're on the list" screen until someone lets them in. They can't see markets, bets or other players while they wait.

Access levels:

| Level | Can do |
|---|---|
| **Owner** (you) | Everything: let people in, reject or remove anyone, choose moderators, change house settings |
| **Moderator** | Let people in, reject sign-ups, remove regular players, approve and resolve markets, settle disputes |
| **Player** | Bet, create markets, comment |
| **Waiting** | Only sees the waiting screen. The page opens by itself once they're approved |
| **Rejected / removed** | Only sees a "no access" screen |

Everything happens in the **Admin** tab. The number on the tab counts sign-up requests, markets to review and disputes.
- **Sign-up requests:** click **Let in** or **Reject**.
- **Players:** **Make moderator** / **Remove moderator** (owner only), and **Remove from board**. Removing someone cuts them off straight away, even mid-session. Their past bets stay on the record so the odds don't change, but they drop off the leaderboard.
- **Rejected and removed:** **Let back in** restores someone with their old credits and bets.

Moderators can't remove you, other moderators or themselves. To remove a moderator, you do it yourself, and they lose moderator powers at the same time. All of this is enforced by the security rules on Google's servers, not just in the page.

## Updating the page later

Replace `site/index.html` with a new version (keep your `site/config.js`) and run `firebase deploy` again.

## Good to know

- **Forgotten passwords.** There's no email, so nobody can reset their own password, and Firebase's "Reset password" button sends an email that goes nowhere. To let someone back in, open **Authentication → Users** in the Firebase console, delete `theirname@woody.example.com`, and have them create the account again with the same username. Their old bets stay with the deleted account, so they start over with fresh credits.
- **Usernames are first come, first served.** Anyone with the link can create an account, but nobody gets in until you or a moderator approve them. A removed player could make a new account, but it lands in your sign-up requests like any other.

- **Credits are play money.** They can't be bought or cashed out, which keeps this a game rather than gambling.
- **Cheating.** Rules stop people from editing anyone else's bets or the house settings. A technical player could still write fake trades into their own record. If that becomes a problem, the next step is moving the betting maths into a Firebase Cloud Function, which needs the pay-as-you-go plan (still pennies at this size).
- **Free-tier limits.** Firestore's free tier allows 50,000 reads and 20,000 writes a day, plenty for a few dozen players. Every open page re-reads data when anyone bets, so a very busy board with hundreds of players could hit the limit.
- **Other hosts.** The `site` folder is plain files. You can host it on Netlify or GitHub Pages instead, but you still need the Firebase project for sign-in and data. Add the new domain under **Authentication → Settings → Authorized domains** to be safe.
