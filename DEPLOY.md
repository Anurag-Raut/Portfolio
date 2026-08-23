# Cloudflare Pages Deployment

## Option 1: Connect via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and sign in.
2. Click **Create a project** → **Connect to Git**.
3. Select your GitHub repository.
4. Configure the build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20 (set under Settings → Environment Variables as `NODE_VERSION=20`)
5. Click **Save and Deploy**.

Cloudflare will automatically build and deploy on every push to your main branch.

## Option 2: Deploy via GitHub Actions (Automated)

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Setup steps:

1. Go to your Cloudflare dashboard → **My Profile** → **API Tokens**.
2. Create a token with these permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
3. Copy the token and your Account ID (found on the right sidebar of any Pages project or the dashboard).
4. In your GitHub repo, go to **Settings** → **Secrets and Variables** → **Actions**.
5. Add these repository secrets:
   - `CLOUDFLARE_API_TOKEN`: the token from step 2
   - `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID
6. Push to `main`/`master`. The workflow will build and deploy automatically.

## Option 3: Deploy via Wrangler CLI (Manual)

```bash
# Install wrangler
npm install -g wrangler

# Login
wrangler login

# Build the site
npm run build

# Deploy
wrangler pages deploy dist --project-name=anurag-portfolio
```

## Custom Domain Setup

After deploying, go to your Pages project → **Custom domains** → **Set up a custom domain**.

Then update the `site` field in `astro.config.mjs` to match your domain so canonical URLs, sitemap, and OG tags are correct.

## Environment Variables

If you need to set environment variables (e.g., for analytics), add them in:
- Cloudflare Dashboard: Pages project → Settings → Environment Variables
- GitHub Actions: Repository secrets
