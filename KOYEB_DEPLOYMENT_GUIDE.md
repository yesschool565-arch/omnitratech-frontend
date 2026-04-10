# Deploy OmnitraTech Backend on Koyeb

## ✅ What's Ready
- ✅ `koyeb.json` deployment configuration created
- ✅ Dockerfile optimized
- ✅ TypeScript build pre-configured
- ✅ Environment variables ready
- ✅ Health check endpoint configured
- ✅ Pushed to GitHub

---

## 🚀 Deploy on Koyeb (3 minutes, NO credit card!)

### Step 1: Create Account
1. Go to: https://koyeb.com
2. Click **"Sign up"** → **"GitHub"**
3. Authorize GitHub
4. Verify email
5. Done! ✅

---

### Step 2: Deploy Service
1. Click **"Create"** → **"Deploy a Service"**
2. Choose **"GitHub"** connection
3. Select repository: `omnitratech-backend`
4. Click **"Create Service"**

---

### Step 3: Configure Deployment
**Koyeb will auto-detect:**
- ✅ Dockerfile found → Use it
- ✅ Build command: Reads from Dockerfile
- ✅ Port: 3001 (from Dockerfile)
- ✅ Health check: /health endpoint

**Just review and click "Deploy"** ✅

---

### Step 4: Wait (2-3 minutes)
```
✓ Building Docker image
✓ Pushing to registry
✓ Deploying service
✓ Running health checks
✓ Service ready!
```

---

## 📝 Your Backend URL

After deployment, you'll get:
```
https://omnitratech-backend-[random].koyeb.app
```

**Save this URL!** You'll need it for the frontend.

---

## 🔐 Set Environment Variables

### Method 1: Via Koyeb Dashboard
1. Go to your service
2. Click **"Settings"** tab
3. Scroll to **"Environment variables"**
4. Click **"Add variable"**
5. Add these:

```
CORS_ORIGIN = https://your-frontend-url.vercel.app
ADMIN_USER = admin
ADMIN_PASSWORD = admin123
JWT_SECRET = aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
```

6. Click **"Save"** → Auto redeploys ✅

---

## ✅ Verify Deployment

### Test Health Endpoint:
```bash
curl https://YOUR_KOYEB_URL/health
```

Should return HTTP 200 ✅

### Check Logs:
1. In Koyeb dashboard
2. Click **"Logs"** tab
3. Should show: `Server listening on port 3001`

---

## 🎯 Deploy Summary

| Step | Time |
|------|------|
| Sign up on Koyeb | 1 min |
| Click "Deploy Service" | 1 min |
| Koyeb deploys backend | 2 min |
| **Total** | **~3-4 minutes** |

---

## 🌍 Features Included

✅ **Auto-deployment from GitHub**
- Every push to `main` auto-deploys
- No manual redeployment needed

✅ **Health Checks**
- Monitors `/health` endpoint
- Auto-restarts on failure

✅ **Global Distribution**
- Edge locations worldwide
- Fast response times

✅ **Zero Downtime Deployments**
- Blue-green deployment strategy

---

## 💡 Important Notes

### Free Tier Limits
- ✅ 2 concurrent services free
- ✅ Unlimited deployments
- ✅ No credit card needed
- ✅ Generous free tier!

### Your Backend URL
```
https://omnitratech-backend-[random].koyeb.app
```

### Environment Variables
Update after deploying frontend:
- `CORS_ORIGIN`: Your Vercel frontend URL
- `ADMIN_USER`: admin
- `ADMIN_PASSWORD`: admin123
- `JWT_SECRET`: Already provided
- `PORT`: 3001 (automatic)
- `NODE_ENV`: production (automatic)

---

## 📚 Useful Koyeb Commands

**Via Dashboard:**
1. **View Logs**: Click service → "Logs" tab
2. **Restart Service**: Click service → "Restart"
3. **Set Environment Variables**: Click "Settings" tab
4. **View Metrics**: Click "Metrics" tab
5. **Edit Service**: Click "Edit" button

---

## 🔗 After Backend Deployment

Once your Koyeb backend is running:

1. **Copy your backend URL:**
   ```
   https://omnitratech-backend-[random].koyeb.app
   ```

2. **Deploy frontend on Vercel:**
   - Import: `https://github.com/yesschool565-arch/omnitratech-frontend`
   - Set environment variable: `VITE_API_URL=YOUR_KOYEB_URL`
   - Deploy!

3. **Update backend CORS:**
   - Go to Koyeb backend settings
   - Update: `CORS_ORIGIN=https://your-vercel-url.vercel.app`
   - Save → Auto redeploys

---

## 🆘 Troubleshooting

### "Service won't deploy"
1. Check Koyeb logs
2. Ensure GitHub repo has:
   - `package.json` ✅
   - `Dockerfile` ✅
   - `src/server.ts` ✅
3. Try redeploying

### "Health check failing"
1. Check logs: `curl https://YOUR_URL/health`
2. Ensure `/health` endpoint exists in server.ts
3. Check PORT environment variable is set to 3001

### "Can't connect to backend from frontend"
1. Check `CORS_ORIGIN` environment variable
2. Make sure it matches your Vercel frontend URL exactly
3. Restart service to apply changes

### "Build timeout"
1. Koyeb has 15-minute build limit
2. Your build is fast (~2 min usually)
3. If over limit, check for large dependencies

---

## ✨ Next Steps

1. **Go to:** https://koyeb.com
2. **Sign up with GitHub**
3. **Click "Create" → "Deploy a Service"**
4. **Select:** `omnitratech-backend` repository
5. **Click "Create Service"**
6. **Wait 2-3 minutes**
7. **Get your backend URL!** 🚀

---

## 📖 Official Resources

- **Koyeb Docs**: https://docs.koyeb.com
- **Docker Support**: https://docs.koyeb.com/docs/build/docker
- **Environment Variables**: https://docs.koyeb.com/docs/deploy/environment-variables
- **Health Checks**: https://docs.koyeb.com/docs/deploy/health-checks

---

**Ready to deploy? Start at https://koyeb.com! 🚀**
