# Blog Admin Portal Setup (Decap CMS)

Your blog has an admin portal at `/admin` powered by Decap CMS. This lets you write and publish blog posts from a web UI — no code editing required. Posts are committed to your GitHub repo and Cloudflare Pages auto-deploys them.

## How It Works

1. You visit `https://yoursite.com/admin/`
2. You authenticate with your GitHub account (OAuth)
3. You write a post in the rich text editor
4. You click "Publish" — Decap CMS commits the post to your repo
5. Cloudflare Pages detects the commit and rebuilds + deploys your site
6. The post is live within ~1-2 minutes

**No database needed.** GitHub is your backend. The admin portal is a static HTML page that talks directly to the GitHub API.

## Setup Steps

### Step 1: Create a GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
2. Fill in:
   - **Application name:** Blog Admin — Anurag Raut
   - **Homepage URL:** `https://anuragraut.dev` (your domain)
   - **Authorization callback URL:** `https://decap-oauth.anuragraut.workers.dev/callback`
3. Click "Register application"
4. Note your **Client ID**
5. Click "Generate a new client secret" and note your **Client Secret**

### Step 2: Deploy the OAuth Worker

```bash
cd workers/decap-oauth

# Set your secrets
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET

# Deploy
wrangler deploy
```

Your worker will be available at `https://decap-oauth.<your-subdomain>.workers.dev`

### Step 3: Update config.yml

Edit `public/admin/config.yml` and update:
- `backend.repo` to your actual GitHub repo (e.g., `Anurag-Raut/portfolio`)
- `backend.base_url` to your deployed worker URL (e.g., `https://decap-oauth.anuragraut.workers.dev`)

### Step 4: Access the admin portal

Visit `https://yoursite.com/admin/` and sign in with GitHub.

## Writing a Blog Post

1. Go to `/admin/`
2. Click "Blog Posts" → "New Blog Post"
3. Fill in the title, description, publish date, tags
4. Write your content in the markdown editor
5. Click "Publish" — the post is committed to your repo and deployed automatically

## Security

- Only your GitHub account can authenticate (the OAuth app is tied to your account)
- The admin page is at `/admin/` but has `noindex` so it won't appear in search results
- For extra security, you can add Cloudflare Zero Trust Access to protect the `/admin` path
