# Deploy OmnitraTech Backend on Glitch

## ✅ What's Ready
- ✅ `postinstall` build script added to package.json
- ✅ `.glitchignore` created for Glitch
- ✅ Environment variables configured
- ✅ TypeScript compilation automated
- ✅ Pushed to GitHub

---

## 🚀 Deploy on Glitch (5 minutes, NO credit card needed!)

### Step 1: Go to Glitch
**Open:** https://glitch.com

### Step 2: Create Account
1. Click **"Sign In"** → **"Sign up with GitHub"**
2. Authorize GitHub
3. Done! ✅

---

### Step 3: Import from GitHub
1. Click **"New Project"** (top left)
2. Click **"Import from GitHub"**
3. Paste this URL:
   ```
   https://github.com/yesschool565-arch/omnitratech-backend
   ```
4. Click **"Import"**

---

### Step 4: Wait for Deployment (2-3 min)

Glitch will automatically:
- ✅ Clone your repository
- ✅ Run `npm install`
- ✅ Run `npm run build` (postinstall script)
- ✅ Run `npm start`
- ✅ Give you a live URL

You'll see in the logs:
```
✓ Building...
✓ Server listening on 0.0.0.0:3001
✓ Ready on https://xyz-abc-123.glitch.me
```

---

## 📝 Your Backend URL

**Format:** `https://PROJECT_NAME.glitch.me`

**Example:** `https://omnitratech-backend.glitch.me`

---

## 🔐 Set Environment Variables

### Method 1: Using .env File (Recommended)

1. In Glitch editor, look for **".env"** file
2. Create one if it doesn't exist
3. Add these values:

```env
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
```

4. **Save** → Auto redeployment happens ✅

---

## ✅ Verify Deployment

### Test the API:
```bash
curl https://YOUR_PROJECT_NAME.glitch.me/health
```

Should return status code 200 with health check response.

### Check Logs:
- In Glitch editor, bottom left → **"Logs"**
- Should show: `Server listening on port 3001`

---

## 🎯 Next Steps After Deployment

1. **Copy your Glitch URL:** `https://YOUR_PROJECT_NAME.glitch.me`

2. **Update Frontend Environment Variable:**
   - Go to Vercel dashboard
   - In frontend project settings → Environment variables
   - Add: `VITE_API_URL=https://YOUR_PROJECT_NAME.glitch.me`

3. **Update Backend CORS:**
   - In Glitch `.env` file
   - Update: `CORS_ORIGIN=https://your-vercel-url.vercel.app`

---

## 💡 Glitch Features

### Auto-Restart on Save
- Edit any file → Auto deploys ✅

### Code Editor
- Browser-based VS Code
- Real-time collaboration
- Git integration

### Logs
- Real-time server logs
- Error tracking
- Request monitoring

### Auto-Deploy from GitHub
1. Click **"Tools"** → **"Git Import/Export"**
2. Link to GitHub repo
3. Auto deploys on every push to main

---

## 🔗 Important URLs

After deploying, you'll have:

- **Backend API**: `https://omnitratech-backend.glitch.me`
- **Health Check**: `https://omnitratech-backend.glitch.me/health`
- **Admin Dashboard**: `https://omnitratech-backend.glitch.me/admin`

---

## 📋 Glitch Project Structure

After import, Glitch creates:

```
omnitratech-backend/
├── src/           (Your source code)
├── dist/          (Compiled TypeScript)
├── package.json   (Updated with postinstall)
├── .env           (Your environment variables)
├── .glitchignore  (Glitch configuration)
├── tsconfig.json  (TypeScript config)
└── ...
```

---

## 🚀 Enable Auto-Deploy from GitHub

To auto-deploy when you push to GitHub:

1. In Glitch: Click **"Tools"** (bottom left)
2. Select **"Git Import/Export"**
3. Click **"Connect Repository"**
4. Select your `omnitratech-backend` repo
5. Click **"Enable Auto-Deployment"**

Now every push to `main` automatically deploys! ✅

---

## ❌ Troubleshooting

### "Build failed"
**Solution:**
1. Check Logs in Glitch
2. Make sure TypeScript compiles locally
3. Run: `npm run build` on your machine
4. Push changes to GitHub
5. Glitch rebuilds automatically

### "Port already in use"
**Solution:**
- Glitch handles port automatically
- Don't hardcode PORT in server.ts (use `process.env.PORT`)
- Your code already does this ✅

### "Module not found"
**Solution:**
1. Make sure all dependencies are in `package.json`
2. Check node_modules folder in Glitch
3. Click **"Clear Logs"** → **"Restart Project"**

### "Glitch project won't start"
**Solution:**
```
1. Check .env file is correct
2. View Logs
3. Look for error messages
4. Click "Console" to debug
5. Copy error message and share it
```

---

## 💚 Glitch + GitHub Workflow

```
Your Computer
    ↓ (git push)
GitHub Repository
    ↓ (auto-import enabled)
Glitch Project
    ↓ (npm install + npm run build + npm start)
Live Backend
    ↓ https://your-project.glitch.me
```

---

## 📚 Useful Glitch Resources

- **Official Docs:** https://glitch.com/help/
- **Community:** https://support.glitch.com
- **Example Projects:** https://glitch.com/culture

---

## ✨ You're All Set!

Your backend is ready to deploy on Glitch!

**Next:**
1. Go to https://glitch.com
2. Import the repository
3. Wait 2-3 minutes
4. Share your backend URL! 🎉

---

**Questions?** The Glitch community is super helpful - there's a support chat in the app! 💬
