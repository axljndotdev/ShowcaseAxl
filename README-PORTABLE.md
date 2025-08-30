# TikTok-Style Affiliate Product Showcase

A modern, mobile-first affiliate marketing showcase built with React, Express, and TypeScript. Features a TikTok-inspired dark theme design with product browsing, search, and affiliate link integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone and setup:**
```bash
git clone <your-repo-url>
cd tiktok-affiliate-showcase
```

2. **Replace configuration files:**
```bash
# Replace package.json with the portable version
mv package-portable.json package.json

# Replace vite config with portable version  
mv vite.config.portable.ts vite.config.ts

# Replace server index with portable version
mv server/index.portable.ts server/index.ts

# Setup environment variables
cp .env.example .env
```

3. **Install dependencies:**
```bash
npm install
```

4. **Run development servers:**

Option A - Full stack (one command):
```bash
npm run dev
```

Option B - Separate servers (recommended for development):
```bash
# Terminal 1 - Backend API (port 5000)
npm run dev:server

# Terminal 2 - Frontend (port 3000)  
npm run dev:client
```

5. **Open your browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🏗️ Build for Production

```bash
# Build both frontend and backend
npm run build

# Or build separately
npm run build:client  # Frontend only
npm run build:server  # Backend only

# Start production server
npm start
```

## 🌐 Deployment Options

### Option 1: Firebase Hosting + Free Backend

**Frontend (Firebase Hosting - FREE):**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build:client`
5. Deploy: `firebase deploy`

**Backend (Free options):**
- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Free tier with 750 hours/month
- **Fly.io**: Free tier with 3 shared-cpu VMs
- **Vercel**: Can host Express with serverless functions

### Option 2: Netlify (Frontend) + Railway (Backend)
Both have generous free tiers perfect for affiliate sites.

### Option 3: Full Firebase
Convert Express API to Firebase Functions for a complete Firebase solution.

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/           # Utilities & API client
│   │   └── hooks/         # Custom React hooks
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data layer
├── shared/               # Shared types/schemas
└── dist/                # Production build output
```

## 🎨 Features

- **Mobile-First Design**: Optimized for mobile TikTok users
- **Product Showcase**: Grid layout with category filtering
- **Search Functionality**: Real-time product search
- **Affiliate Links**: Direct links to partner stores
- **Dark Theme**: TikTok-inspired black background with vibrant accents
- **Responsive Layout**: Works perfectly on all screen sizes
- **Fast Performance**: Optimized images and efficient caching

## 🔧 Environment Variables

```bash
# .env file
NODE_ENV=development
PORT=5000

# For production with separate frontend/backend:
VITE_API_URL=https://your-backend-url.com

# For local development (frontend calls backend directly):
VITE_API_URL=http://localhost:5000
```

## 🎯 Customization

### Adding Products
Edit `server/storage.ts` to add your affiliate products:

```typescript
{
  title: "Your Product",
  brand: "Brand Name", 
  salePrice: "29.99",
  affiliateUrl: "https://partner-store.com/product",
  imageUrl: "https://images.unsplash.com/...",
  categoryId: "cat2", // Fashion, Beauty, Tech, etc.
  badgeText: "NEW",
  badgeType: "new"
}
```

### Styling
- Colors: Edit CSS variables in `client/src/index.css`
- Components: Modify components in `client/src/components/`
- TikTok theme uses: Pink (#FF0050), Cyan (#00F5FF), Yellow (#FFEB3B)

## 💸 Free Hosting Costs

- **Firebase Hosting**: 10GB storage + 10GB transfer/month (FREE)
- **Railway**: 500 hours/month + 1GB memory (FREE)  
- **Netlify**: 100GB bandwidth/month (FREE)
- **Render**: 750 hours/month (FREE)

Perfect for affiliate sites starting out!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for your affiliate projects!