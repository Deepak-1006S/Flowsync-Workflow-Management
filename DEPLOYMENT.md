# Deployment Guide - FlowSync

This document covers deploying FlowSync to various platforms.

## Quick Deployment Options

### 🚀 **Vercel (Recommended)**
**Best for**: React apps, serverless functions, global CDN

- **Setup Time**: < 5 minutes
- **Cost**: Free tier available
- **Features**: Auto-deploy on git push, preview links, serverless functions
- **URL Example**: `https://flowsync.vercel.app`

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed steps.

```bash
npm i -g vercel
vercel
```

### 📦 **Netlify**
**Best for**: Static sites, continuous deployment

- **Setup Time**: < 5 minutes
- **Cost**: Free tier available
- **Features**: Auto-deploy, form handling, serverless functions

```bash
npm i -g netlify-cli
netlify deploy
```

### ☁️ **GitHub Pages**
**Best for**: Free static hosting

- **Setup Time**: < 10 minutes
- **Cost**: Free
- **URL**: `https://username.github.io/flowsync`

```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

Update `package.json`:
```json
{
  "homepage": "https://username.github.io/flowsync",
  "scripts": {
    "deploy": "gh-pages -d build"
  }
}
```

### 🐳 **Docker**
**Best for**: Self-hosted, on-premises

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t flowsync .
docker run -p 3000:3000 flowsync
```

## Deployment Comparison

| Platform | Setup | Cost | CDN | SSL | Auto-Deploy |
|----------|-------|------|-----|-----|-------------|
| Vercel | ⭐ | Free | Yes | Yes | Yes |
| Netlify | ⭐ | Free | Yes | Yes | Yes |
| GitHub Pages | ⭐⭐ | Free | Yes | Yes | Yes |
| AWS S3 | ⭐⭐⭐ | $ | Yes | No | No |
| Heroku | ⭐⭐ | $ | No | Yes | Yes |
| Docker | ⭐⭐⭐ | $ | No | No | Manual |

## Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Builds successfully: `npm run build`
- [ ] No console errors: `npm start`
- [ ] Environment variables configured
- [ ] API endpoints configured
- [ ] Git repository up to date
- [ ] All files committed and pushed

## Production Build

Create optimized production build:

```bash
npm run build
```

This creates `/build` directory with optimized files.

## Environment Configuration

### Local Development
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Production
```
REACT_APP_API_URL=https://api.example.com/api
REACT_APP_ENV=production
```

Set in deployment platform environment variables.

## Monitoring & Analytics

### Enable Vercel Analytics
1. Go to Vercel dashboard
2. Project → Settings → Analytics
3. Enable Web Analytics

### Application Monitoring

```javascript
// Add to App.js or index.js for error tracking
if (window.location.hostname !== 'localhost') {
  // Initialize error tracking (e.g., Sentry)
  console.log('Production environment - monitoring enabled');
}
```

## Security Best Practices

1. **Never commit secrets**: Use `.env` files with `.gitignore`
2. **Use HTTPS**: All platforms provide this
3. **Environment variables**: Store sensitive data in platform settings
4. **Update dependencies**: `npm audit` and `npm update`
5. **CORS configuration**: Set proper origins on backend

## Performance Tips

1. **Code Splitting**: React Router handles this
2. **Image Optimization**: Use image CDN or Vercel Image Optimization
3. **Caching**: Configure in Vercel settings
4. **Monitoring**: Use built-in analytics
5. **Bundle Analysis**: Check bundle size

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Verify variable names start with `REACT_APP_`
- Check platform environment variable settings
- Rebuild and redeploy

### Blank Page
- Check browser console for errors
- Verify API URL configuration
- Review deployment logs

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [React Deployment](https://create-react-app.dev/deployment/)
- [Node Deployment](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## Next Steps

1. Choose deployment platform
2. Follow platform-specific guide
3. Set environment variables
4. Deploy and test
5. Monitor and maintain

---

**Ready to go live! Choose your platform and deploy. 🚀**
