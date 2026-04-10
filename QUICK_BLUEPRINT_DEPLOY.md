# ✅ Quick Blueprint Deployment (5 minutes)

## What You Have

You've already created 2 local repositories:
- ✅ `C:\Users\ASHUTOSH\Desktop\omnitratech-backend` (needs to push to GitHub)
- ✅ `C:\Users\ASHUTOSH\Desktop\omnitratech-frontend` (for Vercel)

---

## 🚀 Deploy Backend Using Blueprint

### Step 1: Push Backend to GitHub (2 minutes)

```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend

# Add GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-backend.git

# Push to GitHub
git push -u origin main
```

✅ Your backend is now on GitHub

---

### Step 2: Create Blueprint Instance on Render (1 minute)

1. Go to https://render.com/dashboard
2. Click **"New Blue Print Instance"** (you should see this prompt)
3. Select your GitHub account
4. Select **`omnitratech-backend`** from the list
5. Click **"Create Blueprint Instance"**
6. Wait 2-5 minutes for deployment

✅ Render reads `render.yaml` and deploys automatically!

---

### Step 3: Get Your Backend URL

1. Go to your Render service dashboard
2. Find the **"Deployment"** section
3. Copy the **Live URL** (e.g., `https://omnitratech-backend.onrender.com`)

✅ Your backend is LIVE!

---

## 🎨 Deploy Frontend to Vercel (2 minutes)

### Step 4: Push Frontend to GitHub

```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend

# Add GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-frontend.git

# Push to GitHub
git push -u origin main
```

---

### Step 5: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Import **`omnitratech-frontend`** from GitHub
4. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://your-render-backend.onrender.com/api`
5. Click **"Deploy"**
6. Wait for deployment

✅ Frontend deployed!

---

## 🔗 Link Backend & Frontend

### Update Backend CORS

1. Go to Render service dashboard
2. Click **"Environment"**
3. Find `CORS_ORIGIN`
4. Change to your Vercel URL: `https://your-project-name.vercel.app`
5. Click **"Save"** (auto-redeploys)

### Update Frontend API URL

1. Go to Vercel project settings
2. Click **"Environment Variables"**
3. Update `VITE_API_URL` to your Render URL: `https://omnitratech-backend.onrender.com/api`
4. Redeploy

✅ Frontend and Backend connected!

---

## ✨ Test Your Deployment

1. Visit your **Vercel frontend**: `https://your-project-name.vercel.app`
2. Open **DevTools** (F12)
3. Go to **Network** tab
4. Try to login or fill contact form
5. Check if API calls work (should see 200 status)

✅ All working!

---

## 📝 What render.yaml Does

Your `render.yaml` automatically:
- ✅ Builds your Node.js backend
- ✅ Sets environment variables
- ✅ Creates persistent database storage
- ✅ Sets up auto-deploy on GitHub push
- ✅ Configures health checks

No manual UI clicking needed! 🎉

---

## 🔄 Future Deployments

### Update Backend Code:
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
git add .
git commit -m "Your changes"
git push origin main
# Automatically deploys to Render!
```

### Update Frontend Code:
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
git add .
git commit -m "Your changes"
git push origin main
# Automatically deploys to Vercel!
```

---

## ✅ Timeline

- ✅ **5 min**: Push backend to GitHub
- ✅ **5 min**: Deploy using Blueprint on Render
- ✅ **5 min**: Push frontend to GitHub
- ✅ **5 min**: Deploy frontend to Vercel
- ✅ **10 min**: Update environment variables

**Total: 30 minutes to production! 🚀**

---

## 🎯 You're Done! 

You now have:
- ✅ Backend running on Render: `https://omnitratech-backend.onrender.com`
- ✅ Frontend running on Vercel: `https://your-project.vercel.app`
- ✅ Auto-deployment setup (push to GitHub = auto-deploy)
- ✅ Production URLs

Congratulations! 🎉

