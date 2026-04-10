# 🚀 Complete GitHub Repository Split & Push Checklist

Follow this checklist to create 2 separate GitHub repositories and push your code.

---

## ✅ Phase 1: Prepare GitHub Repositories

### Step 1.1: Create Backend Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: **omnitratech-backend**
- [ ] Description: "OmnitraTech Backend - Express.js API"
- [ ] **Do NOT initialize** with README
- [ ] Click **Create repository**
- [ ] Copy HTTPS URL: `https://github.com/YOUR_USERNAME/omnitratech-backend.git`

### Step 1.2: Create Frontend Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: **omnitratech-frontend**
- [ ] Description: "OmnitraTech Frontend - React + Vite"
- [ ] **Do NOT initialize** with README
- [ ] Click **Create repository**
- [ ] Copy HTTPS URL: `https://github.com/YOUR_USERNAME/omnitratech-frontend.git`

---

## ✅ Phase 2: Prepare Local Directories

### Step 2.1: Create Backend Directory
```powershell
cd C:\Users\ASHUTOSH\Desktop
mkdir omnitratech-backend
cd omnitratech-backend
```

### Step 2.2: Create Frontend Directory
```powershell
cd C:\Users\ASHUTOSH\Desktop
mkdir omnitratech-frontend
cd omnitratech-frontend
```

---

## ✅ Phase 3: Copy Files from Current Project

### Step 3.1: Copy Backend Files
From: `C:\Users\ASHUTOSH\Desktop\omnitratech---digital-innovation 1\omnitratech---digital-innovation\backend\`

To: `C:\Users\ASHUTOSH\Desktop\omnitratech-backend\`

Copy these folders:
- [ ] `src/`
- [ ] `data/`

Copy these files:
- [ ] `.env`
- [ ] `.env.example`
- [ ] `.dockerignore`
- [ ] `Dockerfile`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `tsconfig.json`
- [ ] `render.yaml`

Also copy:
- [ ] `DEPLOYMENT_GUIDE.md` (from root)
- [ ] `DOCKER_SETUP.md` (from root)

### Step 3.2: Copy Frontend Files
From: `C:\Users\ASHUTOSH\Desktop\omnitratech---digital-innovation 1\omnitratech---digital-innovation\`

To: `C:\Users\ASHUTOSH\Desktop\omnitratech-frontend\`

Copy these folders:
- [ ] `src/`
- [ ] `components/`
- [ ] `utils/`
- [ ] `public/` (if exists)

Copy these files:
- [ ] `.env`
- [ ] `.env.example`
- [ ] `.dockerignore`
- [ ] `Dockerfile`
- [ ] `docker-compose.yml`
- [ ] `vercel.json`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `index.html`
- [ ] `index.tsx`

Also copy:
- [ ] `DEPLOYMENT_GUIDE.md` (from root)

---

## ✅ Phase 4: Create Git Configuration Files

### Step 4.1: Backend .gitignore
In `C:\Users\ASHUTOSH\Desktop\omnitratech-backend\`, create `.gitignore`:

```
node_modules/
npm-debug.log*
dist/
.env
.env.local
.DS_Store
.vscode/
.idea/
*.log
.env*.local
```

- [ ] File created

### Step 4.2: Frontend .gitignore
In `C:\Users\ASHUTOSH\Desktop\omnitratech-frontend\`, create `.gitignore`:

```
node_modules/
npm-debug.log*
dist/
.env.local
.DS_Store
.vscode/
.idea/
*.log
```

- [ ] File created

### Step 4.3: Backend README
In `C:\Users\ASHUTOSH\Desktop\omnitratech-backend\`, create `README.md`:

- [ ] Use template from `BACKEND_REPO_TEMPLATE.md`

### Step 4.4: Frontend README
In `C:\Users\ASHUTOSH\Desktop\omnitratech-frontend\`, create `README.md`:

- [ ] Use template from `FRONTEND_REPO_TEMPLATE.md`

---

## ✅ Phase 5: Initialize Git Repositories

### Step 5.1: Backend Git Setup
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
git init
git config user.name "Your Name Here"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Backend API setup"
git branch -M main
```

- [ ] Commands executed

### Step 5.2: Frontend Git Setup
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
git init
git config user.name "Your Name Here"
git config user.email "your.email@example.com"
git add .
git commit -m "Initial commit: Frontend React setup"
git branch -M main
```

- [ ] Commands executed

---

## ✅ Phase 6: Connect to GitHub and Push

### Step 6.1: Push Backend
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-backend.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

- [ ] Backend pushed successfully

### Step 6.2: Push Frontend
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-frontend.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

- [ ] Frontend pushed successfully

---

## ✅ Phase 7: Verify on GitHub

### Step 7.1: Backend Repository
- [ ] Go to https://github.com/YOUR_USERNAME/omnitratech-backend
- [ ] Verify all backend files are present
- [ ] Check that `.env` file is NOT visible (should be in .gitignore)
- [ ] Verify initial commit exists

### Step 7.2: Frontend Repository
- [ ] Go to https://github.com/YOUR_USERNAME/omnitratech-frontend
- [ ] Verify all frontend files are present
- [ ] Check that `.env` file is NOT visible (should be in .gitignore)
- [ ] Verify initial commit exists

---

## ✅ Phase 8: Update Environment Files

### Step 8.1: Backend .env.example
In backend repository, update `.env.example`:
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
```

- [ ] Updated with correct production domain

### Step 8.2: Frontend .env.example
In frontend repository, update `.env.example`:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

- [ ] Updated with correct production domain

---

## ✅ Phase 9: Push Updates

### Step 9.1: Backend Update
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
git add .env.example
git commit -m "Update env example with production URLs"
git push origin main
```

- [ ] Backend updated

### Step 9.2: Frontend Update
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
git add .env.example
git commit -m "Update env example with production URLs"
git push origin main
```

- [ ] Frontend updated

---

## ✅ Phase 10: Deploy Setup

### Step 10.1: Backend - Render
- [ ] Go to https://render.com/dashboard
- [ ] Click "New" → "Web Service"
- [ ] Select "omnitratech-backend" repository
- [ ] Configure:
  - Build: `npm install && npm run build`
  - Start: `npm start`
  - Environment variables (from .env.example)
- [ ] Deploy

### Step 10.2: Frontend - Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Select "omnitratech-frontend" repository
- [ ] Configure:
  - Framework: "Vite"
  - Environment variable: `VITE_API_URL` = Render backend URL
- [ ] Deploy

---

## ✅ Phase 11: Verify Deployments

### Step 11.1: Backend (Render)
- [ ] Get Render URL (e.g., `https://omnitratech-backend.onrender.com`)
- [ ] Test health endpoint: Visit URL + `/health`
- [ ] Should see: `{ "status": "OK", "timestamp": "..." }`

### Step 11.2: Frontend (Vercel)
- [ ] Get Vercel URL (e.g., `https://omnitratech.vercel.app`)
- [ ] Visit the URL in browser
- [ ] Should load without errors
- [ ] Test API calls work (check DevTools Network)

### Step 11.3: Update Cross-Origin
- [ ] Backend (Render): Set `CORS_ORIGIN` = Vercel frontend URL
- [ ] Frontend (Vercel): Set `VITE_API_URL` = Render backend URL
- [ ] Both redeploy automatically

---

## 🎉 Completion Checklist

- [ ] **Backend Repository**: Created, files copied, pushed to GitHub
- [ ] **Frontend Repository**: Created, files copied, pushed to GitHub
- [ ] **Git Repositories**: Both initialized with main branch
- [ ] **.gitignore Files**: Created to exclude node_modules and .env
- [ ] **README Files**: Created for both repositories
- [ ] **GitHub Verification**: Both repos visible with correct files
- [ ] **Render Backend**: Deployed and accessible
- [ ] **Vercel Frontend**: Deployed and accessible
- [ ] **Cross-Origin Updated**: Both services can communicate
- [ ] **APIs Working**: Frontend successfully calls backend APIs

---

## 📝 Important Notes

✅ **`.env` files should NOT be in repositories** - Only `.env.example` files are committed
✅ **Keep `package-lock.json`** - Ensures consistent installations
✅ **Update URLs after deployment** - Cross-link your production URLs
✅ **Future commits** - Always commit from correct directory:
   - Backend changes → Push to omnitratech-backend
   - Frontend changes → Push to omnitratech-frontend

---

## 🆘 Troubleshooting

### If push fails with authentication error:
1. Create GitHub Personal Access Token
2. Use token as password
3. Or set up SSH keys

### If .env files are visible in repository:
1. Run: `git rm --cached .env`
2. Commit and push
3. Will be removed in next commit

### If you missed files:
1. Copy missing files to correct directory
2. `git add missing-file.js`
3. `git commit -m "Add missing file"`
4. `git push origin main`

---

**Need help?** See these guides:
- GITHUB_SETUP_GUIDE.md - Detailed GitHub setup
- SPLIT_REPOS_SCRIPT.md - Automated split script
- DEPLOYMENT_GUIDE.md - Production deployment
- DOCKER_SETUP.md - Docker container setup

