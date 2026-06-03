# FlowSync - Deploy to Vercel in 3 Steps

## ✅ Step 1: Prepare Repository

```bash
cd d:\FlowSync

# Make sure git is initialized
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - FlowSync workflow management system"

# Add remote (replace with your repo)
git remote add origin https://github.com/yourusername/flowsync.git

# Push to main branch
git branch -M main
git push -u origin main
```

## ✅ Step 2: Connect to Vercel

### Option A: GitHub Integration (Easiest)

1. Open https://vercel.com/new
2. Click "Import Project"
3. Paste your GitHub repository URL
4. Click "Import"
5. Vercel auto-detects React settings
6. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## ✅ Step 3: Set Environment Variables

In Vercel Dashboard:

1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add these variables:

| Key | Value | Notes |
|-----|-------|-------|
| `REACT_APP_API_URL` | `https://your-api.com/api` | Leave empty for mock data |
| `REACT_APP_ENV` | `production` | Fixed value |

4. Click "Save"

## 🎉 Done!

Your app is now live at: **https://your-project.vercel.app**

## Auto-Deploy

Every push to `main` branch auto-deploys:

```bash
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys!
```

## View Your App

- **Production**: https://your-project.vercel.app
- **Dashboard**: https://vercel.com/dashboard
- **Logs**: Dashboard → Select project → "Deployments"

## Troubleshooting

### Deploy Failed?
1. Check "Deployments" tab in Vercel dashboard
2. Click failed deployment to see logs
3. Fix issues and push again

### Blank Page?
1. Check environment variables are set
2. Open browser DevTools (F12) → Console
3. Look for errors
4. Check API_URL configuration

### Need Preview Link?
Create a pull request on GitHub - Vercel creates automatic preview deployment!

## Next: Connect Backend API

Update `REACT_APP_API_URL` in Vercel environment variables to your backend:

```
REACT_APP_API_URL=https://your-backend.com/api
```

## More Options

- **Custom Domain**: Settings → Domains
- **Analytics**: Settings → Analytics
- **Previews**: Every PR gets a preview link
- **Rollback**: Deployments tab → Rollback

---

**Your app is live! 🚀**

Full guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
