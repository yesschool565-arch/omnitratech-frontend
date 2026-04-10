# Build and Deployment Information

## Frontend Deployment on Vercel

### Build Statistics
- **Framework**: React 19.2.4 + Vite 6.2.0
- **Output**: Static files in `/dist` directory
- **Build Time**: ~30-60 seconds
- **Build Size**: ~200-400 KB (gzipped)

### Deployment Configuration
- **Vercel Config File**: `vercel.json`
- **Build Command**: `npm run build`
- **Start Command**: Production deployment (static)
- **Environment Variables**:
  - `VITE_API_URL`: Backend API URL (from Render)

### Static Files
- All routes are rewritten to `/index.html` for React Router SPA
- Assets, CSS, and JS bundles cached with long TTL
- CDN distributed globally by Vercel

---

## Backend Deployment on Render

### Build Statistics
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 18.x or 20.x
- **Output**: JavaScript files in `/dist` directory
- **Build Time**: ~2-3 minutes (includes npm install)
- **Database**: JSON file-based (persistent with Render disk)

### Deployment Configuration
- **Render Config**: `backend/render.yaml`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node dist/server.js`
- **Port**: 3001 (automatically assigned by Render)
- **Environment Variables**:
  - `PORT`: Auto-assigned by Render (3001)
  - `CORS_ORIGIN`: Frontend URL (from Vercel)
  - `NODE_ENV`: production
  - `ADMIN_USER`: admin
  - `ADMIN_PASSWORD`: admin123

### Persistent Storage
- **Database**: `/opt/render/project/backend/data/database.json`
- **Disk Size**: 1 GB (allocated automatically)
- **Auto-Backup**: Render handles persistence

---

## Next Steps

1. **Verify TypeScript Configuration**
   ```bash
   cd backend
   npm run type-check
   ```

2. **Test Production Build Locally**
   ```bash
   # Frontend
   npm run build
   npm run preview
   
   # Backend
   cd backend
   npm run build
   npm start
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare deployment configuration"
   git push origin main
   ```

4. **Deploy Frontend**
   - Go to Vercel
   - Connect GitHub repository
   - Add environment variables
   - Deploy

5. **Deploy Backend**
   - Go to Render
   - Create web service
   - Connect GitHub repository
   - Add environment variables
   - Deploy

6. **Update Cross-Origin Configuration**
   - After both deployed, update environment variables with production URLs
   - Test full integration

---

## Performance Optimization

### Frontend (Vercel)
- ✅ Code splitting with Vite
- ✅ Tree shaking enabled
- ✅ Minification and sourcemap removal in production
- ✅ Global CDN distribution
- ✅ Automatic HTTPS

### Backend (Render)
- ✅ Build optimization
- ✅ Production dependencies only
- ✅ Health checks configured
- ✅ Auto-restart on crashes
- ✅ CORS properly configured

---

## Troubleshooting Checklist

- [ ] Both frontend and backend environment variables set
- [ ] `CORS_ORIGIN` on backend matches `VITE_API_URL` domain
- [ ] Database.json exists and is readable
- [ ] Admin credentials working
- [ ] Health check endpoint responding
- [ ] TypeScript compilation successful
- [ ] No environment variable references in code
- [ ] Production build tested locally

