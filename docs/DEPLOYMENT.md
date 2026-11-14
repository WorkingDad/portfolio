# GitHub Pages Deployment & Domain Configuration

## 1. Hosting on GitHub Pages

Because this codebase is a modern static web application, it deploys directly onto GitHub Pages without needing any backend server, Python installation, or database setup.

### Automated GitHub Actions Workflow
Create `.github/workflows/deploy.yml` in your repository:

\`\`\`yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

## 2. Custom Domain Configuration (`tedfinger.us`)

1. Go to your GitHub repository: **Settings** > **Pages**.
2. Under **Custom domain**, type:
   \`\`\`
   tedfinger.us
   \`\`\`
   and click **Save**.
3. Check the box **Enforce HTTPS** (GitHub will provision a free Let's Encrypt SSL certificate within a few minutes).
4. At your domain registrar (e.g. Namecheap, GoDaddy, Cloudflare, Google Domains):
   - Add four **A Records** pointing `@` to GitHub's global IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add one **CNAME Record** pointing `www` to:
     - `<your-github-username>.github.io`
