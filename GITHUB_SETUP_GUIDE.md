# GitHub Repositories Setup Guide

## Step 1: Create Two GitHub Repositories

### Repository 1: Frontend
1. Go to [GitHub](https://github.com)
2. Click **"New"** → Create repository
3. **Repository name**: `omnitratech-frontend`
4. **Description**: "OmnitraTech Frontend - React + Vite"
5. **Visibility**: Public
6. **Do NOT initialize with README** (we'll push existing code)
7. Click **Create repository**
8. Copy the HTTPS URL (e.g., `https://github.com/your-username/omnitratech-frontend.git`)

### Repository 2: Backend
1. Click **"New"** → Create repository
2. **Repository name**: `omnitratech-backend`
3. **Description**: "OmnitraTech Backend - Express.js + Node.js"
4. **Visibility**: Public
5. **Do NOT initialize with README**
6. Click **Create repository**
7. Copy the HTTPS URL (e.g., `https://github.com/your-username/omnitratech-backend.git`)

---

## Step 2: Prepare Local Directories

Open PowerShell and run these commands:

### Create Backend Repository Directory
```powershell
# Navigate to a parent directory (e.g., Desktop or Documents)
cd C:\Users\ASHUTOSH\Desktop

# Create a new directory for backend repo
mkdir omnitratech-backend
cd omnitratech-backend

# Initialize git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Create Frontend Repository Directory
```powershell
# Go back to parent directory
cd C:\Users\ASHUTOSH\Desktop

# Create a new directory for frontend repo
mkdir omnitratech-frontend
cd omnitratech-frontend

# Initialize git
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

---

## Step 3: Copy Files to Correct Repositories

### For Backend Repository:
Copy these folders/files from your current project to `C:\Users\ASHUTOSH\Desktop\omnitratech-backend\`:

```
backend/
  -> src/
  -> data/
  -> .env
  -> .env.example
  -> .dockerignore
  -> Dockerfile
  -> package.json
  -> package-lock.json
  -> tsconfig.json
  -> render.yaml
README.md (backend specific)
.gitignore
```

### For Frontend Repository:
Copy these folders/files from your current project to `C:\Users\ASHUTOSH\Desktop\omnitratech-frontend\`:

```
src/
components/
utils/
public/
  -> index.html
  -> index.tsx (if exists)
.env
.env.example
.dockerignore
Dockerfile
docker-compose.yml
vercel.json
package.json
package-lock.json
tsconfig.json
vite.config.ts
README.md (frontend specific)
.gitignore
```

---

## Step 4: Add .gitignore Files

I'll create these for you. The following are ready to copy.

### Backend .gitignore
```
node_modules
npm-debug.log
dist
.env
.env.local
.DS_Store
.vscode
.idea
*.log
.env*.local
/data/database.json.backup
```

### Frontend .gitignore
```
node_modules
npm-debug.log
dist
.env.local
.DS_Store
.vscode
.idea
*.log
.env*.local
```

---

## Step 5: Add Backend Files

### backend/README.md
```markdown
# OmnitraTech Backend API

Express.js server with TypeScript for OmnitraTech digital platform.

## Features
- REST API endpoints
- Admin panel
- JSON-based database
- CORS support
- Authentication with JWT tokens

## Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start Production
```bash
npm start
```

## Environment Variables
See `.env.example` for configuration.

## Docker
```bash
docker build -t omnitratech-backend .
docker run -p 3001:3001 omnitratech-backend
```

## API Documentation
Base URL: `http://localhost:3001/api`

### Admin Panel
http://localhost:3001/admin

Default credentials:
- Username: `admin`
- Password: `admin123`

### Endpoints
- `POST /admin/login` - Admin login
- `GET /services` - Get all services
- `GET /industries` - Get all industries
- `GET /jobs` - Get all jobs
- `GET /resources` - Get all resources
- `GET /settings` - Get site settings
- `POST /form-entries` - Submit contact form
- `GET /footer-links` - Get footer links

## Deployment
Deploy to [Render](https://render.com) using `render.yaml`

## License
MIT
```

---

## Step 6: Add Frontend Files

### frontend/README.md
```markdown
# OmnitraTech Frontend

React + Vite application for OmnitraTech digital platform.

## Features
- Modern React 19 with TypeScript
- Vite for fast builds
- React Router for navigation
- Beautiful UI components
- Responsive design

## Quick Start

### Prerequisites
- Node.js 18.x or later
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## Environment Variables
See `.env.example` for configuration.

```
VITE_API_URL=http://localhost:3001/api
```

## Docker
```bash
docker build -t omnitratech-frontend .
docker run -p 5175:5175 omnitratech-frontend
```

## Pages
- Home - Landing page
- Services - Technology solutions
- Industries - Vertical solutions
- Resources - Documentation
- Careers - Job listings
- Contact - Contact form
- Admin - Admin dashboard

## Deployment
Deploy to [Vercel](https://vercel.com)

## License
MIT
```

---

## Step 7: Push to GitHub

### Push Backend
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Backend API setup"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-backend.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Push Frontend
```powershell
cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Frontend React setup"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/omnitratech-frontend.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Step 8: Verification

1. Go to your GitHub profile
2. Verify both repositories exist:
   - `omnitratech-frontend`
   - `omnitratech-backend`
3. Check that all files are pushed correctly
4. Verify `.env` files are NOT pushed (should be in .gitignore)

---

## Step 9: Update References

### frontend/.env.example
Update with your backend URL:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### backend/.env.example
Update with your frontend URL:
```
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## Step 10: Deploy

### Frontend on Vercel
1. Go to [Vercel](https://vercel.com)
2. Import `omnitratech-frontend` repository
3. Set environment variables
4. Deploy

### Backend on Render
1. Go to [Render](https://render.com)
2. Import `omnitratech-backend` repository
3. Set environment variables
4. Deploy

---

## Future Development

### Clone repositories for development:
```powershell
# Clone frontend
git clone https://github.com/YOUR_USERNAME/omnitratech-frontend.git

# Clone backend
git clone https://github.com/YOUR_USERNAME/omnitratech-backend.git
```

### Making changes:
```powershell
# Make changes, then:
git add .
git commit -m "Your commit message"
git push origin main
```

---

## Troubleshooting

### Authentication Issues
If git asks for credentials:
1. Create a GitHub Personal Access Token
2. Use token as password when prompted

### File not in repo
Check `.gitignore` - ensure unwanted files are listed

### Want to delete and restart
```powershell
# Remove .git folder (warning: deletes git history)
rm -r .git

# Reinitialize
git init
```

