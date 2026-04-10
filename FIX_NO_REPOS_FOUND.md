# 🔧 Fix: Render Can't See GitHub Repositories

## Problem
You see **"No repositories found"** on Render's Blueprint page.

This means Render is not authorized to access your GitHub repositories.

---

## ✅ Solution: Grant GitHub Permissions

### Step 1: Click "Configure account" under GitHub

On the Blueprint page you showed:
1. **Right side** → Look for **"GitHub"**
2. Click **"Configure account"** link
3. You'll be redirected to GitHub

---

### Step 2: Authorize Render on GitHub

GitHub will ask:
- **"Authorize render-rnw?"**
- Or similar authorization message

1. Review the permissions (Render needs to read your repos)
2. Click **"Authorize"** or **"Install"**
3. Select **"Only select repositories"**
4. Check these boxes:
   - ✅ `omnitratech-backend`
   - ✅ `omnitratech-frontend`
5. Click **"Install"** or **"Authorize"**

---

### Step 3: Return to Render

After authorizing:
1. You'll be redirected back to Render
2. You should see: **"✅ Connected"** next to GitHub
3. Refresh the page (F5)
4. Click **"Connect a repository"** again
5. **Now your repositories should appear!**

---

## 🎯 If That Doesn't Work

### Alternative: Use Public Repository URL

1. On Render Blueprint page
2. Scroll down to **"Public Git Repository"**
3. Paste your GitHub URL manually:
   ```
   https://github.com/YOUR_USERNAME/omnitratech-backend.git
   ```
4. Click **"Continue"**
5. Render will read the `render.yaml` from that URL

---

## 📋 Step-by-Step Visual Guide

```
Render Blueprint Page
     ↓
Right side: GitHub section
     ↓
Click "Configure account"
     ↓
GitHub authorization screen
     ↓
Click "Authorize render"
     ↓
Select your repositories
     ↓
Click "Install"
     ↓
Back to Render
     ↓
Refresh page (F5)
     ↓
Now you see your repositories! ✅
```

---

## ✅ Verify GitHub is Connected

1. After authorizing, go back to Render
2. Look at the GitHub section
3. You should see:
   - ✅ **"GitHub"** with a checkmark
   - ✅ Status showing **"Connected"**
   - ✅ Your username listed

---

## 🚀 After Connecting GitHub

1. Go to Blueprint creation page again
2. Click **"Connect a repository"** 
3. Search for **"omnitratech-backend"**
4. Select it
5. Click **"Create Blueprint Instance"**
6. Done! ✅

---

## 🆘 Still Not Working?

### Troubleshoot GitHub Connection

1. Go to https://github.com/settings/apps
2. Look for **"Render"** app
3. If not there, Render not installed yet:
   - Go to Render dashboard
   - Click "Configure account" under GitHub
   - Complete the authorization flow

4. If it IS there:
   - Click on Render app
   - Click **"Configure"**
   - Under "Repository access" select:
     - **"All repositories"** (easier)
     - OR specifically select your 2 repos
   - Click **"Save"** or **"Update"**

5. Go back to Render and refresh

---

## 🎯 Using Public Repository URL Instead

If GitHub connection still fails, use this method:

1. On Render Blueprint page
2. Bottom section: **"Public Git Repository"**
3. Paste:
   ```
   https://github.com/YOUR_USERNAME/omnitratech-backend.git
   ```
4. Click **"Continue"**
5. Render reads `render.yaml` from the URL
6. Click **"Create Blueprint Instance"**

**This works even without GitHub OAuth!**

---

## 📝 Checklist

- [ ] Clicked "Configure account" under GitHub
- [ ] GitHub asked permission, I clicked "Authorize"
- [ ] Selected repositories or chose "All repositories"
- [ ] Clicked "Install"
- [ ] Back on Render, I see "✅ Connected" next to GitHub
- [ ] Refreshed page (F5)
- [ ] Now I can see my repositories in the dropdown

---

## 💡 Pro Tip

After authorizing once, next time you won't need to re-authorize. The connection stays active until you revoke it.

---

**Try these steps and let me know which step you're on!** 🚀

