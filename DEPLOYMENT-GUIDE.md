# 🚀 Deployment Guide - 100% Free Hosting

This guide shows you how to deploy your TikTok-style affiliate showcase for **completely free** using Firebase Hosting + Railway.

## 🎯 Architecture

- **Frontend**: Firebase Hosting (FREE - 10GB/month)
- **Backend**: Railway (FREE - 500 hours/month)  
- **Database**: In-memory storage (no database costs)

## 📋 Prerequisites

1. GitHub account
2. Firebase account (Google account)
3. Railway account (can sign up with GitHub)

## 🔧 Step 1: Prepare Your Code

1. **Replace config files** (these are already created for you):
```bash
mv package-portable.json package.json
mv vite.config.portable.ts vite.config.ts  
mv server/index.portable.ts server/index.ts
```

2. **Update environment variables**:
```bash
# Create production .env
echo "NODE_ENV=production" > .env
echo "PORT=5000" >> .env
```

## 🚂 Step 2: Deploy Backend to Railway (FREE)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

2. **Deploy on Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js and deploys!

3. **Get your API URL**:
   - Railway will give you a URL like: `https://your-app-production.up.railway.app`
   - Copy this URL for the next step

## 🔥 Step 3: Deploy Frontend to Firebase (FREE)

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase project**:
```bash
firebase init hosting
```
   - Create new project or select existing
   - Choose `dist/public` as public directory
   - Configure as single-page app: **Yes**
   - Don't overwrite index.html

4. **Configure API URL**:
```bash
# Create production environment file
echo "VITE_API_URL=https://your-app-production.up.railway.app" > .env.production
```

5. **Build and deploy**:
```bash
# Build with production API URL
npm run build:client

# Deploy to Firebase
firebase deploy
```

6. **Your site is live!**
   - Firebase gives you a URL like: `https://your-project.web.app`

## ✅ Step 4: Test Your Deployment

1. Visit your Firebase URL
2. Check that:
   - Products load correctly
   - Search works
   - Category filtering works
   - Product detail pages work
   - Affiliate links work

## 🔄 Step 5: Set Up Auto-Deploy (Optional)

**Railway Auto-Deploy:**
- Railway automatically redeploys when you push to GitHub
- No additional setup needed!

**Firebase Auto-Deploy:**
1. **Install GitHub Actions**:
```yaml
# .github/workflows/firebase.yml
name: Deploy to Firebase
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:client
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
```

## 💡 Pro Tips

### Free Tier Limits
- **Firebase**: 10GB storage + 10GB/month transfer
- **Railway**: 500 hours/month (enough for 24/7 for 20+ days)  
- **Perfect for**: Affiliate sites with moderate traffic

### Monitoring
- **Railway**: Built-in metrics and logs
- **Firebase**: Analytics and performance monitoring
- **Uptime**: Both services have excellent uptime

### Scaling
When you outgrow free tiers:
- **Firebase**: Pay-as-you-go pricing  
- **Railway**: $5/month for more resources
- **Alternative**: Migrate to Vercel, Netlify, or AWS

## 🆘 Troubleshooting

### API Not Loading
```bash
# Check VITE_API_URL is correct
echo $VITE_API_URL

# Rebuild with correct API URL
npm run build:client
firebase deploy
```

### Railway Deployment Issues
- Check Railway logs in dashboard
- Ensure `package.json` has correct start script
- Verify Node.js version compatibility

### CORS Errors
The portable server includes CORS configuration for cross-origin requests.

## 🎉 Success!

Your TikTok-style affiliate showcase is now live on the internet for **100% free**!

- **Frontend**: Fast, global CDN via Firebase
- **Backend**: Reliable API hosting via Railway  
- **Cost**: $0/month for typical affiliate site traffic
- **Uptime**: 99.9%+ on both platforms

Perfect for affiliate marketers who want a professional presence without monthly hosting costs!