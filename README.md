# Hosting Woody Polymarket

This folder is a version of the board you can put on the internet yourself. Anyone with the link picks a username and password and gets free play credits. No email address is needed. You are the only moderator until you promote someone.

Everything runs on Cloudflare, free at this size:
- **Cloudflare Pages** serves the page (the `site` folder) at `https://<your-project>.pages.dev`
- **Pages Functions** (the `functions` folder) handle sign-in and check every change against the permissions
- **D1**, Cloudflare's database, stores accounts, markets, bets and comments

## Trying it on your own computer first

You only need Node.js (https://nodejs.org, the LTS version). Open a terminal in this folder and run:

```
node server.js
```

Then open http://localhost:8080. The first account you create is the owner (or set the `WOODY_OWNER` environment variable first). Everything is saved in `local-data.json` next to `server.js`; delete that file to start over. Press Ctrl+C to stop the server.

To try it with several players, open a second browser (or a private window) and create another account. Changes show up in the other window within a few seconds.

The local server has the same API and permissions as the Cloudflare version, but it's for testing only. It isn't built to face the internet.

## Putting it online

The code lives at https://github.com/derekvoll07-cloud/WoodyMarket. Cloudflare builds from there.

### 1. Create the database
1. In the Cloudflare dashboard, open **Storage & databases → D1 SQL database → Create**.
2. Name it `woody` and create it. The tables are created automatically the first time the site is used.

### 2. Create the Pages project
1. Open **Workers & Pages → Create → Pages → Connect to Git**, authorize GitHub if asked, and pick **WoodyMarket**.
2. Build settings: framework preset **None**, build command **empty**, build output directory **`site`**.
3. Click **Save and Deploy**. The first deploy shows "This board's database isn't set up yet" until step 3 is done.

### 3. Connect the database to the site
1. In the Pages project, open **Settings → Bindings → Add → D1 database**.
2. Variable name **`DB`** (exactly that), database **woody**. Save.
3. Optional: under **Settings → Variables and secrets**, add `OWNER_USERNAME` if your owner username isn't `derekv`.
4. Open **Deployments**, and on the latest one choose **Retry deployment** so the binding takes effect.

### 4. First run
1. Open your `pages.dev` link straight away, type your owner username (`derekv`) and a password, and press **Create account**. Do this before you share the link, so nobody else can claim the owner username. You'll see the **Admin** tab.
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
- **Players:** **Make moderator** / **Remove moderator** (owner only), and **Remove from board**. Removing someone cuts them off straight away. Their past bets stay on the record so the odds don't change, but they drop off the leaderboard.
- **Rejected and removed:** **Let back in** restores someone with their old credits and bets.

Moderators can't remove you, other moderators or themselves. To remove a moderator, you do it yourself, and they lose moderator powers at the same time. All of this is checked on Cloudflare's servers in `functions/api/[[route]].js`, not just in the page.

## Updating the page later

Push changes to the `main` branch on GitHub. Cloudflare redeploys automatically within a minute or two.

## Good to know

- **Forgotten passwords.** There's no email, so nobody can reset their own password. To let someone back in, open the `woody` database in the D1 dashboard (**Console** tab) and run `DELETE FROM sessions WHERE uid = (SELECT uid FROM users WHERE name = 'theirname'); DELETE FROM users WHERE name = 'theirname';`, then have them create the account again with the same username. Their old bets stay with the old account, so they start over with fresh credits.
- **Usernames are first come, first served.** Anyone with the link can create an account, but nobody gets in until you or a moderator approve them. A removed player could make a new account, but it lands in your sign-up requests like any other.
- **Credits are play money.** They can't be bought or cashed out, which keeps this a game rather than gambling.
- **Cheating.** The server stops people from editing anyone else's bets or the house settings. A technical player could still write fake trades into their own record. If that becomes a problem, the next step is moving the betting maths into the Pages Function.
- **Password guessing.** There's no limit on sign-in attempts. If that worries you, add a rate-limiting rule for `/api/login` under **Security → WAF → Rate limiting rules** (the free plan includes one).
- **Free-tier limits.** Open pages check for changes every 4 seconds (and stop while the tab is in the background). Cloudflare's free plan allows 100,000 requests a day, which is about 110 hours of open-tab time per day across all players. Plenty for a few dozen players; a very busy board would need the $5/month Workers Paid plan.
