# Split Repository Setup Script

## Automated Setup Using PowerShell

Save this as `split-repos.ps1` and run it:

```powershell
# split-repos.ps1
# This script splits the monorepo into two separate repositories

$sourceDir = "C:\Users\ASHUTOSH\Desktop\omnitratech---digital-innovation 1\omnitratech---digital-innovation"
$workDir = "C:\Users\ASHUTOSH\Desktop"
$gitUsername = "Your Name"  # CHANGE THIS
$gitEmail = "your.email@example.com"  # CHANGE THIS
$githubUsername = "your-username"  # CHANGE THIS

Write-Host "🚀 Starting repository split..." -ForegroundColor Green

# =====================
# BACKEND REPOSITORY
# =====================

Write-Host "`n📦 Creating backend repository..." -ForegroundColor Cyan

# Create directory
$backendDir = "$workDir\omnitratech-backend"
if (Test-Path $backendDir) {
    Write-Host "⚠️  Backend directory exists, skipping creation"
} else {
    New-Item -ItemType Directory -Path $backendDir | Out-Null
    Write-Host "✅ Created: $backendDir"
}

# Copy backend files
Write-Host "`n📋 Copying backend files..." -ForegroundColor Cyan
Copy-Item "$sourceDir\backend\*" -Destination $backendDir -Recurse -Force
Copy-Item "$sourceDir\DOCKER_SETUP.md" -Destination $backendDir
Copy-Item "$sourceDir\DEPLOYMENT_GUIDE.md" -Destination $backendDir

# Create backend .gitignore
@"
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
/data/database.json.backup
*.swp
*.swo
*~
"@ | Out-File -FilePath "$backendDir\.gitignore" -Encoding UTF8

# Create backend README
@"
# OmnitraTech Backend API

Express.js server with TypeScript for OmnitraTech platform.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build & Deploy

\`\`\`bash
npm run build
npm start
\`\`\`

## Environment

See \`.env.example\` for configuration.

## API

Base: \`http://localhost:3001/api\`

## Docker

\`\`\`bash
docker build -t omnitratech-backend .
docker run -p 3001:3001 omnitratech-backend
\`\`\`

## Deploy to Render

Push to GitHub and connect to Render dashboard.

See DEPLOYMENT_GUIDE.md for details.
"@ | Out-File -FilePath "$backendDir\README.md" -Encoding UTF8

Write-Host "✅ Backend files copied"

# Initialize git for backend
Write-Host "`n🔧 Initializing git for backend..." -ForegroundColor Cyan
Push-Location $backendDir
git init
git config user.name $gitUsername
git config user.email $gitEmail
git add .
git commit -m "Initial commit: Backend API"
git branch -M main
Write-Host "✅ Backend git initialized"
Pop-Location

# =====================
# FRONTEND REPOSITORY
# =====================

Write-Host "`n📦 Creating frontend repository..." -ForegroundColor Cyan

# Create directory
$frontendDir = "$workDir\omnitratech-frontend"
if (Test-Path $frontendDir) {
    Write-Host "⚠️  Frontend directory exists, skipping creation"
} else {
    New-Item -ItemType Directory -Path $frontendDir | Out-Null
    Write-Host "✅ Created: $frontendDir"
}

# Copy frontend files (exclude backend folder)
Write-Host "`n📋 Copying frontend files..." -ForegroundColor Cyan
Get-ChildItem -Path $sourceDir -Exclude backend, "omnitratech-backend", ".git", "node_modules", "dist" | ForEach-Object {
    if ($_.PSIsContainer) {
        Copy-Item $_.FullName -Destination "$frontendDir\$($_.Name)" -Recurse -Force
    } else {
        Copy-Item $_.FullName -Destination $frontendDir -Force
    }
}

# Create frontend .gitignore
@"
node_modules/
npm-debug.log*
dist/
.env.local
.DS_Store
.vscode/
.idea/
*.log
.env*.local
.cache/
.parcel-cache/
.turbo/
"@ | Out-File -FilePath "$frontendDir\.gitignore" -Encoding UTF8

# Create frontend README
@"
# OmnitraTech Frontend

React + Vite application for OmnitraTech platform.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Build & Deploy

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Environment

See \`.env.example\` for configuration.

## Docker

\`\`\`bash
docker build -t omnitratech-frontend .
docker run -p 5175:5175 omnitratech-frontend
\`\`\`

## Deploy to Vercel

Push to GitHub and connect to Vercel dashboard.

See DEPLOYMENT_GUIDE.md for details.
"@ | Out-File -FilePath "$frontendDir\README.md" -Encoding UTF8

Write-Host "✅ Frontend files copied"

# Initialize git for frontend
Write-Host "`n🔧 Initializing git for frontend..." -ForegroundColor Cyan
Push-Location $frontendDir
git init
git config user.name $gitUsername
git config user.email $gitEmail
git add .
git commit -m "Initial commit: Frontend"
git branch -M main
Write-Host "✅ Frontend git initialized"
Pop-Location

# =====================
# SUMMARY
# =====================

Write-Host "`n"
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║          ✅ REPOSITORIES READY                 ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n📂 Backend Repository" -ForegroundColor Cyan
Write-Host "   Location: $backendDir"
Write-Host "   Status: ✅ Git initialized"
Write-Host "   Next: git remote add origin https://github.com/$githubUsername/omnitratech-backend.git"
Write-Host "         git push -u origin main"

Write-Host "`n📂 Frontend Repository" -ForegroundColor Cyan
Write-Host "   Location: $frontendDir"
Write-Host "   Status: ✅ Git initialized"
Write-Host "   Next: git remote add origin https://github.com/$githubUsername/omnitratech-frontend.git"
Write-Host "         git push -u origin main"

Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Create two repositories on GitHub:"
Write-Host "   - omnitratech-backend"
Write-Host "   - omnitratech-frontend"
Write-Host ""
Write-Host "2. Push backend:"
Write-Host "   cd $backendDir"
Write-Host "   git remote add origin https://github.com/$githubUsername/omnitratech-backend.git"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "3. Push frontend:"
Write-Host "   cd $frontendDir"
Write-Host "   git remote add origin https://github.com/$githubUsername/omnitratech-frontend.git"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "4. Deploy:"
Write-Host "   - Connect backend to Render"
Write-Host "   - Connect frontend to Vercel"

Write-Host "`n✅ Script completed!" -ForegroundColor Green
```

---

## How to Use

1. **Open PowerShell** as Administrator
2. **Edit the variables at the top**:
   ```powershell
   $gitUsername = "Your Name"
   $gitEmail = "your.email@example.com"
   $githubUsername = "your-github-username"
   ```
3. **Run the script**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   .\split-repos.ps1
   ```

---

## Manual Steps if Script Doesn't Work

### For Backend:
```powershell
# 1. Navigate to Desktop
cd C:\Users\ASHUTOSH\Desktop

# 2. Create directory
mkdir omnitratech-backend
cd omnitratech-backend

# 3. Initialize git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 4. Copy files (manually copy backend/ folder from source)

# 5. Add all files
git add .

# 6. Commit
git commit -m "Initial commit: Backend API"

# 7. Rename branch
git branch -M main

# 8. Add remote
git remote add origin https://github.com/your-username/omnitratech-backend.git

# 9. Push
git push -u origin main
```

### For Frontend:
```powershell
# 1. Navigate to Desktop
cd C:\Users\ASHUTOSH\Desktop

# 2. Create directory
mkdir omnitratech-frontend
cd omnitratech-frontend

# 3. Initialize git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 4. Copy files (manually copy everything except backend/)

# 5. Add all files
git add .

# 6. Commit
git commit -m "Initial commit: Frontend"

# 7. Rename branch
git branch -M main

# 8. Add remote
git remote add origin https://github.com/your-username/omnitratech-frontend.git

# 9. Push
git push -u origin main
```

---

## Verify on GitHub

After pushing:
1. Go to https://github.com/your-username
2. You should see both repositories:
   - `omnitratech-backend`
   - `omnitratech-frontend`
3. Each should have your initial commit

✅ Done! Now you can deploy each independently.
