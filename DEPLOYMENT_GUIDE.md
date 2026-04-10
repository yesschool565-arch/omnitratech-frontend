# Deployment Guide for OmnitraTech

## Frontend Deployment - Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   In Vercel Project Settings → Environment Variables, add:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   GEMINI_API_KEY = (optional, your API key)
   ```
   Replace `your-backend-url` with your actual Render backend URL

4. **Deploy**
   - Vercel automatically builds from `package.json` scripts
   - Build command: `npm run build` (already configured)
   - Output directory: `dist`
   - Click "Deploy" and wait for completion

5. **Verify Deployment**
   - Your site will be available at `https://your-project.vercel.app`
   - Test the UI and check that API calls work

---

## Backend Deployment - Render

### Prerequisites
- Render account (https://render.com)
- GitHub repository

### Deployment Steps

1. **Prepare Your Repository**
   - Ensure your backend is in `backend/` directory
   - Commit all changes to GitHub

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Connect Render to GitHub and authorize

3. **Configure Service**
   - **Name:** `omnitratech-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build` (in root directory context)
   - **Start Command:** `node dist/server.js` (in root directory context)
   - **Plan:** Free tier recommended for testing

4. **Set Environment Variables**
   In Render → Environment Variables, add:
   ```
   PORT=3001
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-domain.vercel.app
   ADMIN_USER=admin
   ADMIN_PASSWORD=admin123
   JWT_SECRET=aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
   ```
   Update `CORS_ORIGIN` with your actual Vercel URL after frontend deployment

5. **Add Persistent Storage (Optional)**
   - Render → Disk → Add Disk
   - Mount path: `/opt/render/project/backend/data`
   - Size: 1 GB

6. **Deploy**
   - Click "Create Web Service"
   - Render automatically deploys from your repository
   - Check deployment logs in Render dashboard

7. **Get Your Backend URL**
   - Once deployed, Render shows your service URL
   - Format: `https://your-service-name.onrender.com`
   - Update Vercel `VITE_API_URL` with this URL + `/api`

---

## Post-Deployment Configuration

### Step 1: Update CORS on Render
After Vercel deployment:
1. Get your Vercel URL (e.g., `https://omnitratech.vercel.app`)
2. Go to Render → Environment Variables
3. Update `CORS_ORIGIN=https://omnitratech.vercel.app`
4. Deploy changes

### Step 2: Update API URL on Vercel
After Render deployment:
1. Get your Render URL (e.g., `https://omnitratech-backend.onrender.com`)
2. Go to Vercel → Settings → Environment Variables
3. Set `VITE_API_URL=https://omnitratech-backend.onrender.com/api`
4. Redeploy Vercel

### Step 3: Test Everything
1. Visit your Vercel URL
2. Test login to admin panel at `/admin`
3. Try creating/editing content
4. Check API calls in browser DevTools

---

## Troubleshooting

### CORS Errors
- Verify `CORS_ORIGIN` on Render matches your Vercel domain exactly
- Check browser console for exact error messages

### 404 on API Endpoints
- Ensure `VITE_API_URL` includes `/api` suffix
- Verify Render service is running (check logs)

### Admin Panel Login Fails
- Check credentials in Render environment variables
- Default: `admin` / `admin123`
- Verify JWT_SECRET is set

### Database Not Persisting
- Render free plan has ephemeral storage
- Add persistent disk in Render → Disks section
- Mount at `/opt/render/project/backend/data`

### Build Fails
- Check Render deployment logs for errors
- Ensure `tsconfig.json` exists in backend directory
- Verify all dependencies in `package.json`
- Try manual deployment: `git push origin main`

---

## Environment Variables Reference

### Frontend (.env for Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
GEMINI_API_KEY=(optional)
```

### Backend (.env for Render)
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=(keep the current value)
```

---

## Quick Links
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)

---

## Additional Notes
- Database is JSON file-based, no external DB needed
- Render restarts apps weekly on free plan; database persists with disk
- Vercel automatically rebuilds on git push
- Both platforms have free tiers suitable for development

