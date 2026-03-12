# Gogreen Exchange CMS

Full content management system for the Gogreen Exchange landing page.

## What you can manage
- Exchange rates (buy/sell) — updates live on the landing page
- WhatsApp number & all social handles
- Hero section text
- Feature cards (all 3)
- How It Works steps
- Services grid
- Customer reviews
- FAQs
- CTA & footer text
- Admin password

## Deploy to Railway (free)

### Step 1 — GitHub
1. Create a GitHub account at github.com
2. Create a new repo called `gogreen-cms`
3. Upload all these files (not the zip itself, the files inside)

### Step 2 — Railway
1. Go to railway.app → Sign up free
2. New Project → Deploy from GitHub repo → select `gogreen-cms`
3. Go to **Variables** tab, add these:

```
ADMIN_PASS=YourPasswordHere
JWT_SECRET=make-this-very-long-and-random-like-GoGreen2026AfricaXchange!
BUY_RATE=1388
SELL_RATE=1489
WA_NUMBER=2347010975329
```

4. Railway auto-deploys and gives you a URL like:
   `https://gogreen-cms-production.up.railway.app`

### Step 3 — Connect your landing page
1. Open `gogreen-landing.html`
2. Find: `var API_URL = 'https://YOUR-RAILWAY-URL.railway.app'`
3. Replace with your actual Railway URL
4. Redeploy or re-upload the HTML file

### Step 4 — Access admin panel
Go to: `https://your-railway-url.railway.app/admin`
- Username: `admin`
- Password: whatever you set in `ADMIN_PASS`

## Local development
```bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```
Then open: http://localhost:3000/admin

## Security notes
- Change ADMIN_PASS before deploying
- Use a long random JWT_SECRET
- Never commit your .env file
- The database file (gogreen.db) resets on Railway redeploy
  — for permanent data, upgrade to Railway's paid plan or use PlanetScale
