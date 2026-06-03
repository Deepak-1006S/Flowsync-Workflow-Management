# Vercel Deployment Guide for FlowSync

## Prerequisites

- GitHub account with repository
- Vercel account (free at https://vercel.com)
- Node.js and npm installed locally

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

#### Option A: GitHub Integration (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Connect your GitHub account
4. Select the FlowSync repository
5. Click "Import"

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd d:\FlowSync
vercel
```

### 3. Configure Environment Variables

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_ENV=production
```

**Note**: If you don't have a backend API yet, leave `REACT_APP_API_URL` empty (uses mock data).

### 4. Build Settings

**Framework**: React  
**Build Command**: `npm run build`  
**Output Directory**: `build`  
**Install Command**: `npm install`  

These are auto-detected by Vercel, but verify in project settings.

### 5. Deploy

#### Automatic Deployment (GitHub Connected)

Every push to your main branch automatically deploys:

```bash
git commit -m "Latest changes"
git push origin main
# Vercel automatically deploys!
```

#### Manual Deployment

```bash
vercel --prod
```

### 6. Monitor Deployment

- Check deployment status in Vercel dashboard
- View logs if deployment fails
- Access your app at `https://your-project.vercel.app`

## Environment-Specific Configuration

### Development
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Production (Vercel)
```
REACT_APP_API_URL=https://your-production-api.com/api
REACT_APP_ENV=production
```

## Serverless API Functions (Optional)

Vercel supports serverless functions. The `/api` directory contains example handlers.

### Create API Endpoint

Create file: `api/workflows.js`

```javascript
export default function handler(req, res) {
  // Your API logic here
  res.status(200).json({ message: 'Success' });
}
```

Access at: `https://your-project.vercel.app/api/workflows`

## Optimization Tips

### 1. Analytics & Monitoring
- Enable Vercel Analytics
- Set up error tracking
- Monitor performance

### 2. Build Optimization
```bash
# Analyze bundle size
npm install --save-dev source-map-explorer
npm run build
source-map-explorer 'build/static/js/*.js'
```

### 3. Performance

- Enable image optimization
- Set up CDN caching
- Configure compression

### 4. Security

- Enable HTTPS (automatic)
- Set security headers
- Configure CORS if needed

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Test locally: `npm run build`
4. Check `package.json` scripts

### Blank Page After Deploy

1. Check browser console for errors
2. Verify API_URL environment variable
3. Check network requests in DevTools
4. Review Vercel logs

### CORS Issues

1. Ensure backend allows Vercel domain
2. Add proper CORS headers on backend
3. Use proxy if needed

## Advanced Deployment

### Custom Domain

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records
5. Verify domain

### Preview Deployments

Every pull request creates a preview deployment:
- Automatic URL generated
- Test before merging
- Share with team

### Rollback to Previous Version

```bash
vercel list                    # Show deployments
vercel rollback [deployment]  # Rollback to specific version
```

## Connecting Backend API

### Backend on Different Service

If your backend is on Heroku, AWS, etc.:

1. Set `REACT_APP_API_URL` to your backend domain
2. Ensure CORS is enabled on backend
3. Test API connectivity

### Backend with Vercel Functions

Create `api/workflows.js` and implement your backend endpoints as serverless functions.

## CI/CD Pipeline

### Automatic Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Post-Deployment Checklist

- ✅ Frontend loads without errors
- ✅ All routes work
- ✅ API connectivity verified
- ✅ Environment variables set
- ✅ Custom domain configured (if applicable)
- ✅ HTTPS enabled
- ✅ Monitoring set up
- ✅ Error tracking enabled

## Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

## Support

For Vercel-specific issues:
- Check [Vercel Status](https://www.vercel-status.com/)
- Review [Vercel Docs](https://vercel.com/docs)
- Contact Vercel Support

---

**Your app is now ready to deploy to Vercel! 🚀**
