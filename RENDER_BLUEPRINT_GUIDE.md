# 🚀 Render Blueprint Deployment Guide

## What is a Blueprint?

A **Blueprint** is Render's Infrastructure-as-Code (IaC) approach. Instead of manually clicking through the UI, you define your entire deployment in a YAML file, and Render automatically sets everything up.

**Benefits:**
✅ Reproducible deployments
✅ Version control your infrastructure
✅ Auto-sync with GitHub
✅ Easy scaling
✅ No manual UI clicks

---

## 📋 Prerequisites

Before using Blueprint, ensure:
- ✅ Backend code pushed to GitHub (`omnitratech-backend` repo)
- ✅ `render.yaml` file in the root of backend repository
- ✅ GitHub connected to Render account

---

## 🎯 Step 1: Update render.yaml

Your `render.yaml` file should look like this:

```yaml
services:
  - type: web
    name: omnitratech-backend
    runtime: node
    plan: free
    
    # Replace with your GitHub URL
    repo: https://github.com/YOUR_USERNAME/omnitratech-backend.git
    branch: main
    
    buildCommand: npm install && npm run build
    startCommand: npm start
    
    envVars:
      - key: PORT
        value: 3001
      - key: NODE_ENV
        value: production
      - key: CORS_ORIGIN
        value: https://YOUR_FRONTEND_DOMAIN.vercel.app
      - key: ADMIN_USER
        value: admin
      - key: ADMIN_PASSWORD
        value: admin123
    
    disk:
      name: omnitratech-db
      mountPath: /opt/render/project/backend/data
      sizeGB: 1
    
    autoDeployOnPush: true
    healthCheckPath: /health
```

**Replace these:**
- `YOUR_USERNAME` → Your GitHub username
- `YOUR_FRONTEND_DOMAIN` → Your Vercel frontend domain (e.g., `your-app`)

---

## 🎁 Step 2: Commit and Push render.yaml

```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend

# Make sure render.yaml is updated
git add render.yaml
git commit -m "Update render.yaml for Blueprint deployment"
git push origin main
```

---

## 🌐 Step 3: Deploy Using Blueprint on Render

### Method A: From GitHub (Recommended)

1. Go to https://render.com — Connect with GitHub if not already
2. You should see a prompt: **"You haven't created any Blueprint instances yet"**
3. Click **"New Blueprint Instance"**
4. You'll see your GitHub repositories listed
5. Select **`omnitratech-backend`**
6. Click **"Create Blueprint Instance"**
7. Render will:
   - Read your `render.yaml`
   - Create the web service automatically
   - Deploy your backend
   - Show deployment logs

### Method B: Manual from Render Dashboard

1. Go to https://render.com/dashboard
2. Click **"Blueprints"** tab (left sidebar)
3. Click **"New Blueprint Instance"**
4. Select your GitHub account
5. Select **`omnitratech-backend`** repository
6. Review the configuration from `render.yaml`
7. Click **"Create Blueprint Instance"**
8. Wait for deployment (2-5 minutes)

---

## ✅ What Happens During Deployment

```
1. Render reads render.yaml
2. Creates a new web service named "omnitratech-backend"
3. Runs: npm install && npm run build
4. Creates 1GB persistent disk
5. Sets up environment variables
6. Starts service: npm start
7. Runs health check at /health endpoint
8. Service goes LIVE! 🎉
```

---

## 🎉 Deployment Complete

You should see:
- ✅ Service status: "Live"
- ✅ Service URL: `https://omnitratech-backend.onrender.com` (or similar)
- ✅ Auto-deploy enabled (pushes to GitHub trigger redeployment)

---

## 📝 Example render.yaml Files

### Full Backend Blueprint

```yaml
services:
  - type: web
    name: omnitratech-backend
    runtime: node
    plan: free
    region: oregon
    
    repo: https://github.com/your-username/omnitratech-backend.git
    branch: main
    
    buildCommand: npm install && npm run build
    startCommand: npm start
    
    envVars:
      - key: PORT
        value: 3001
      - key: NODE_ENV
        value: production
      - key: CORS_ORIGIN
        value: https://omnitratech.vercel.app
      - key: ADMIN_USER
        value: admin
      - key: ADMIN_PASSWORD
        value: admin123
      - key: JWT_SECRET
        fromFile: .env
    
    disk:
      name: db
      mountPath: /opt/render/project/backend/data
      sizeGB: 1
    
    autoDeployOnPush: true
    healthCheckPath: /health
    healthCheckStartupTimeout: 300
```

---

## 🔄 Auto-Deployment

Once Blueprint is set up, **every push to GitHub automatically redeploys**:

```
git push origin main
    ↓
GitHub webhook triggers Render
    ↓
Render pulls latest code
    ↓
npm install && npm run build
    ↓
Service restarts with new code
    ↓
✅ Deployed! (no manual action needed)
```

---

## 🔐 Environment Variables in render.yaml

### Using Hard-coded Values
```yaml
envVars:
  - key: ADMIN_USER
    value: admin
```

### Using .env File (Recommended for Secrets)
```yaml
envVars:
  - key: JWT_SECRET
    fromFile: .env
```

### Secret Values (Encrypted)
```yaml
envVars:
  - key: DATABASE_URL
    sync: false  # Don't sync with GitHub
```

---

## 🆘 Troubleshooting

### Issue: "Blueprint not found"
**Solution**: 
- Ensure `render.yaml` is in root of GitHub repository
- Push to GitHub
- Refresh Render page

### Issue: "Build failed"
**Solution**:
- Check Render deployment logs
- Verify `npm install && npm run build` works locally
- Check all dependencies in package.json

### Issue: "Service won't start"
**Solution**:
- Check `startCommand: npm start` is correct
- Verify dist/ folder created in build
- Check health check endpoint `/health` accessible

### Issue: "Disk not persisting"
**Solution**:
- Ensure disk path matches in render.yaml
- Check that disk is mounted correctly
- Use logs to verify data directory creation

---

## 📊 Monitoring Your Deployment

After Blueprint creates your service:

1. **Logs Tab**: View real-time application logs
2. **Metrics Tab**: CPU, memory, disk usage
3. **Settings Tab**: Modify environment variables (will auto-redeploy)
4. **Deployments Tab**: View deployment history

---

## 🔄 Updating Deployment

### Change Environment Variables:
1. Go to Render service settings
2. Click "Environment"
3. Update value
4. Save (auto-redeploys)

### Change Code:
```powershell
git push origin main
# Automatically triggers redeployment!
```

### Change render.yaml:
```powershell
# Edit render.yaml
git add render.yaml
git commit -m "Update render config"
git push origin main
# Render re-reads render.yaml and applies changes
```

---

## ✨ Next Steps

1. ✅ Update `render.yaml` in your backend repository
2. ✅ Push to GitHub
3. ✅ Go to Render → Click "New Blueprint Instance"
4. ✅ Select your backend repository
5. ✅ Render automatically deploys using your render.yaml

**Total time: 5-10 minutes to live! 🚀**

---

## 📚 Additional Resources

- [Render Blueprint Docs](https://render.com/docs/infrastructure-as-code)
- [Render YAML Reference](https://render.com/docs/yaml-spec)
- [Render Deployment Guide](https://render.com/docs/deploy-node)

---

**Blueprint deployment is the best way to manage infrastructure! 🎉**

