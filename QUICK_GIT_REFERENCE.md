# 🚀 Quick Reference: GitHub Repository Split

## TL;DR - Essential Commands Only

### 1️⃣ Create Two GitHub Repos
1. Go to https://github.com/new → Create `omnitratech-backend`
2. Go to https://github.com/new → Create `omnitratech-frontend`

---

### 2️⃣ Backend Setup & Push
```powershell
# Navigate to Desktop
cd C:\Users\ASHUTOSH\Desktop

# Create directory
mkdir omnitratech-backend
cd omnitratech-backend

# Copy YOUR backend files from current project
# (backend folder, src, data, package.json, etc.)

# Initialize Git
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit: Backend"
git branch -M main

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-backend.git
git push -u origin main
```

---

### 3️⃣ Frontend Setup & Push
```powershell
# Go back to Desktop
cd ..

# Create directory
mkdir omnitratech-frontend
cd omnitratech-frontend

# Copy YOUR frontend files from current project
# (src, components, utils, package.json, vite.config.ts, etc.)

# Initialize Git
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial commit: Frontend"
git branch -M main

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-frontend.git
git push -u origin main
```

---

### 4️⃣ Create .gitignore Files

**Backend**: `omnitratech-backend/.gitignore`
```
node_modules/
npm-debug.log*
dist/
.env
.env.local
.DS_Store
```

**Frontend**: `omnitratech-frontend/.gitignore`
```
node_modules/
npm-debug.log*
dist/
.env.local
.DS_Store
```

---

### 5️⃣ Verify
- Visit `https://github.com/YOUR_USERNAME/omnitratech-backend`
- Visit `https://github.com/YOUR_USERNAME/omnitratech-frontend`
- Both should have files visible

---

## Common Git Commands

### View status
```powershell
git status
```

### Add all changes
```powershell
git add .
```

### Commit changes
```powershell
git commit -m "Your message"
```

### Push to GitHub
```powershell
git push origin main
```

### Pull latest from GitHub
```powershell
git pull origin main
```

### Check remote URL
```powershell
git remote -v
```

### Change remote URL
```powershell
git remote set-url origin NEW_URL
```

---

## Deployment Quick Links

### Backend on Render
1. Go to https://render.com
2. New Web Service
3. Connect GitHub repo: `omnitratech-backend`
4. Build: `npm install && npm run build`
5. Start: `npm start`
6. Get URL: `https://your-service.onrender.com`

### Frontend on Vercel
1. Go to https://vercel.com
2. New Project
3. Connect GitHub repo: `omnitratech-frontend`
4. Set env var: `VITE_API_URL = https://your-service.onrender.com/api`
5. Deploy

---

## After Deployment

Update environment variables in both:

**Backend (Render)**:
```
CORS_ORIGIN=https://your-site.vercel.app
```

**Frontend (Vercel)**:
```
VITE_API_URL=https://your-service.onrender.com/api
```

Then redeploy both.

---

## Directory Locations After Split

```
Desktop/
├── omnitratech-backend/      ← Backend repo
│   ├── .git/
│   ├── src/
│   ├── data/
│   ├── package.json
│   └── ... backend files
│
├── omnitratech-frontend/     ← Frontend repo
│   ├── .git/
│   ├── src/
│   ├── components/
│   ├── package.json
│   └── ... frontend files
│
└── omnitratech---digital-innovation 1/  ← Original (keep for backup)
    └── omnitratech---digital-innovation/
```

---

## Workflow: Making Changes After Split

### Change Backend Code
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
```

### Change Frontend Code
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
```

---

## Useful Links

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://github.github.com/training-kit/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

## ⚠️ Don't Forget

- ✅ Create repos WITHOUT initializing them
- ✅ Update YOUR_USERNAME in git URLs
- ✅ Create .gitignore BEFORE first commit
- ✅ Never commit `.env` file (only `.env.example`)
- ✅ Update CORS_ORIGIN and VITE_API_URL after deployment

---

**Pro Tip**: After your first push to both repos, future deployments happen automatically when you push code!

