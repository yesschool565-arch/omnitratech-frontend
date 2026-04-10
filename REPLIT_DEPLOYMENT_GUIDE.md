# Deploy OmnitraTech Backend on Replit

## ✅ What's Ready
- ✅ `replit.nix` - Replit runtime configuration
- ✅ `.replit` - Replit project configuration  
- ✅ `postinstall` script in package.json - Auto-builds TypeScript
- ✅ Dockerfile optimized
- ✅ Environment variables configured
- ✅ Pushed to GitHub

---

## 🚀 Deploy on Replit (2 minutes, 100% FREE!)

### Step 1: Create Replit Account
1. Go to: https://replit.com
2. Click **"Sign up"** 
3. Click **"Sign up with GitHub"**
4. Authorize GitHub
5. Verify email
6. Done! ✅

---

### Step 2: Import From GitHub
1. Click **"+"** button (top left)
2. Select **"Import from GitHub"**
3. Paste your repo URL:
   ```
   https://github.com/yesschool565-arch/omnitratech-backend
   ```
4. Click **"Import from GitHub"**

---

### Step 3: Replit Auto-Deploys ✅
Replit will automatically:
- ✅ Read `.replit` configuration
- ✅ Install Node.js 20 (from replit.nix)
- ✅ Run `npm install`
- ✅ Run `npm run build` (compiles TypeScript)
- ✅ Run `npm start` (starts the server)

---

### Step 4: Get Your Live URL

After deployment (1-2 minutes), you'll see:
```
✓ Listening on http://localhost:3001
```

Your public URL is shown at the top:
```
https://omnitratech-backend.[your-username].repl.co
```

**Copy this URL!** You'll need it for the frontend.

---

## 🔐 Set Environment Variables

### Method 1: Via Replit Secrets (Recommended)
1. In Replit editor, left sidebar
2. Click **"Secrets"** icon (lock icon)
3. Click **"Create New Secret"**
4. Add each variable:

```
Name: CORS_ORIGIN
Value: https://your-frontend-url.vercel.app

Name: ADMIN_USER
Value: admin

Name: ADMIN_PASSWORD
Value: admin123

Name: JWT_SECRET
Value: aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
```

5. Click **"Add Secret"** after each one
6. Auto restarts! ✅

---

## ✅ Verify Deployment

### Test Health Endpoint
```bash
curl https://YOUR_REPLIT_URL/health
```

Should return HTTP 200 ✅

### Check Logs
1. In Replit, click **"Console"** tab
2. Should show: `Server listening on 0.0.0.0:3001`
3. API requests will log in real-time

---

## 🎯 Replit Features

### Always On
- Your backend stays running 24/7
- No sleep/wake cycles
- ✅ Truly always-on free tier

### Live Collaboration
- Share links with others
- Real-time code editing
- Multiplayer debugging

### Built-in Terminal
- Full bash access
- Git commands work
- Install custom packages

### Git Integration
- Code editor shows git status
- Push/pull directly from Replit
- GitHub sync built-in

---

## 📝 Your Replit Project Structure

```
omnitratech-backend/
├── src/                    # TypeScript source
│   ├── server.ts          # Main server
│   ├── controllers/       # API controllers
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── middleware/        # Express middleware
├── dist/                  # Compiled JavaScript
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── replit.nix             # Replit runtime
├── .replit                # Replit config
├── Dockerfile             # Docker config
└── koyeb.json            # Other platforms
```

---

## 🔗 After Backend Deployment

Once your Replit backend is live:

1. **Copy your Replit URL:**
   ```
   https://omnitratech-backend.[your-username].repl.co
   ```

2. **Deploy frontend on Vercel:**
   - Go to: https://vercel.com
   - Import: `https://github.com/yesschool565-arch/omnitratech-frontend`
   - Add environment variable: `VITE_API_URL=YOUR_REPLIT_URL`
   - Deploy!

3. **Update backend CORS:**
   - In Replit Secrets, update: `CORS_ORIGIN=https://your-vercel-url.vercel.app`
   - Replit auto-restarts
   - Done! ✅

---

## 💡 Replit Tips

### Stop Replit From Sleeping
Replit free tier stays online! No worries. ✅

### View Real-time Logs
1. Click **"Console"** tab
2. See all server logs
3. Watch API requests live

### Edit Code Live
1. Click any file
2. Edit in browser
3. Auto-saves
4. Replit auto-restarts on save ✅

### Use Terminal
1. Click **"Shell"** tab
2. Full bash access
3. Run git commands, npm, etc.

### Invite Others
1. Click **"Share"** button
2. Choose collaboration level
3. Others can edit in real-time

---

## 🆘 Troubleshooting

### "Build failed" or "Dependencies error"
**Solution:**
1. Click **"Shell"** tab
2. Run: `npm install --legacy-peer-deps`
3. Then: `npm run build`
4. Click **"Run"** button

### "Module not found errors"
**Solution:**
1. Delete `node_modules` folder
2. Click **"Shell"** tab
3. Run: `rm -rf node_modules package-lock.json`
4. Run: `npm install`
5. Click **"Run"**

### "Server won't start"
**Solution:**
1. Check Console for errors
2. Verify environment variables are set
3. Check PORT is set to 3001
4. Run: `npm start` in Shell manually

### "Can't connect from frontend"
**Solution:**
1. Verify `CORS_ORIGIN` environment variable
2. Make sure it matches your Vercel URL exactly
3. Wait 10 seconds after setting secret
4. Test in browser: `curl https://YOUR_REPLIT_URL/health`

---

## 📚 Useful Replit Commands

**In Shell tab:**
```bash
# Check logs
tail -f logs.txt

# Rebuild
npm run build

# Start server manually
npm start

# Install package
npm install package-name

# Push to GitHub
git push origin main

# Pull latest
git pull origin main

# Check status
git status
```

---

## 🌟 Why Replit is Best for Free

✅ **100% Free** - No credit card ever
✅ **Always On** - 24/7 uptime
✅ **Easy Setup** - 1-click import from GitHub
✅ **Live Editing** - Edit and see changes instantly
✅ **Collaboration** - Share links with team
✅ **Git Integrated** - Push/pull from Replit
✅ **Terminal Access** - Full bash shell
✅ **Auto Restart** - Changes auto-deploy

---

## 🚀 Quick Start

**Go here:** https://replit.com

**Then:**
1. Sign up with GitHub
2. Click "+"
3. Select "Import from GitHub"
4. Paste: `https://github.com/yesschool565-arch/omnitratech-backend`
5. Click "Import"
6. Wait 1-2 minutes
7. **Get your live backend URL!** 🎉

---

## 📖 Official Resources

- **Replit Docs**: https://docs.replit.com
- **Node.js Support**: https://docs.replit.com/languages/nodejs
- **Secrets Guide**: https://docs.replit.com/tutorials/storing-secrets-and-api-keys
- **Community**: https://ask.replit.com

---

## ✨ Your Backend is Ready!

Everything is configured. Just import on Replit and you're live!

**Start here:** https://replit.com 🚀
