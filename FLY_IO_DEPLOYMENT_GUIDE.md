# Deploy OmnitraTech Backend on Fly.io

## ✅ What's Ready
- ✅ `fly.toml` configuration created
- ✅ Dockerfile optimized
- ✅ Environment variables configured
- ✅ Health checks set up

---

## 🚀 Deploy in 5 Minutes

### Step 1: Create Fly.io Account (2 min)
1. Go to https://fly.io
2. Click **"Sign Up"**
3. Sign up with GitHub (easiest)
4. Verify email
5. Done! ✅

---

### Step 2: Install Fly CLI (2 min)

**On Windows (PowerShell as Admin):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**On macOS:**
```bash
brew install flyctl
```

**On Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

---

### Step 3: Login to Fly.io
```bash
flyctl auth login
```
- Opens browser → Login with GitHub → Approve → Done!

---

### Step 4: Deploy Backend (1 min)

```bash
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
flyctl launch --now
```

**When prompted:**
- **App name**: `omnitratech-backend` (or your choice)
- **Region**: `ord` (Chicago) - Press Enter to accept
- **Build with Dockerfile**: Yes
- **Deploy now**: Yes

---

### Step 5: Wait for Deployment (2-3 min)
```
✓ Launched app
✓ Building image
✓ Pushing to registry
✓ Releasing to production
✓ Health checks passed
✓ Deployed successfully!
```

---

## 📝 Your Backend URL

After deployment, you'll see:
```
App 'omnitratech-backend' is now available at https://omnitratech-backend.fly.dev
```

**Copy this URL!** You'll need it for the frontend.

---

## 🔐 Set Environment Variables

```bash
flyctl secrets set CORS_ORIGIN=https://YOUR_FRONTEND_URL.vercel.app
flyctl secrets set ADMIN_USER=admin
flyctl secrets set ADMIN_PASSWORD=admin123
flyctl secrets set JWT_SECRET=aFoZlWRbWgaeu321l7KKAV6p05waem82z63mXOQr97jcO+1dACh5qnR7UqVY5UGqAsZb4f81E9SzC1tl1vQ8RQ==
```

Or via dashboard:
1. Go to https://fly.io/dashboard
2. Click **omnitratech-backend**
3. Go to **Secrets** tab
4. Add each secret

---

## ✅ Verify Deployment

```bash
# Check logs
flyctl logs

# Check status
flyctl status

# Test health endpoint
curl https://omnitratech-backend.fly.dev/health
```

---

## 🎯 Important Notes

### Free Tier Limits
- ✅ 3 shared-cpu-1x 256MB VMs free
- ✅ 160GB/month data transfer free
- ✅ No persistent disk (data lost on restart)
- ✅ Auto suspends after 30 days inactivity
- ❌ Data persistence: Use PostgreSQL add-on ($7/month) if needed

### Your Backend URL
```
https://omnitratech-backend.fly.dev
```

### Environment Variables
- `CORS_ORIGIN`: Frontend URL (update after Vercel deploys)
- `ADMIN_USER`: admin
- `ADMIN_PASSWORD`: admin123
- `JWT_SECRET`: Already set
- `PORT`: 3001 (automatic)
- `NODE_ENV`: production (automatic)

---

## 🔗 Next Steps

1. **Deploy this backend** ✅ (5 minutes)
2. **Deploy frontend to Vercel** (5 minutes)
3. **Update environment variables** (1 minute)
4. **Test the connection** (1 minute)

---

## 📚 Useful Commands

```bash
# View logs
flyctl logs

# Check app status
flyctl status

# Restart app
flyctl restart

# View secrets
flyctl secrets list

# SSH into app
flyctl ssh console

# Deploy latest push
flyctl deploy

# Scale up
flyctl scale count 2

# View dashboard
flyctl open
```

---

## 🆘 Troubleshooting

### "Launched app stuck in deployment"
```bash
# Cancel and retry
flyctl destroy omnitratech-backend
flyctl launch --now
```

### "Health check failing"
```bash
# Check logs
flyctl logs

# Ensure /health endpoint is accessible
curl https://omnitratech-backend.fly.dev/health
```

### "Need to rebuild after code changes"
```bash
# After pushing to GitHub
flyctl deploy
```

---

## 💡 Pro Tips

1. **Auto-deploy from GitHub**: [Set up in Fly.io dashboard]
2. **Monitor your app**: https://fly.io/dashboard
3. **Email notifications**: Enable in app settings
4. **Custom domain**: Add your own domain in Fly.io settings

---

**Ready? Let's deploy!** 🚀

Run `flyctl launch --now` and share the output!
