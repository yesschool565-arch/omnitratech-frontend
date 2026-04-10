# 📊 Repository Split Architecture & Structure

## Before Split (Monorepo)
```
omnitratech---digital-innovation/
│
├── src/                          ┐
├── components/                   │ Frontend
├── utils/                        │ Code
├── package.json (frontend)       │
├── vite.config.ts               ┘
│
├── backend/                       ┐
│   ├── src/                      │ Backend
│   ├── data/                     │ Code
│   ├── package.json (backend)    │
│   └── tsconfig.json            ┘
│
├── docker-compose.yml
├── Dockerfile (frontend)
├── DEPLOYMENT_GUIDE.md
└── ...configuration files
```

---

## After Split (Two Repos)
```
GitHub/
│
├── omnitratech-frontend         ← https://github.com/YOU/omnitratech-frontend
│   ├── .git/
│   ├── src/
│   ├── components/
│   ├── utils/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   ├── vercel.json
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   └── ...
│
└── omnitratech-backend          ← https://github.com/YOU/omnitratech-backend
    ├── .git/
    ├── src/
    ├── data/
    ├── package.json
    ├── tsconfig.json
    ├── Dockerfile
    ├── render.yaml
    ├── .env.example
    ├── .gitignore
    ├── README.md
    └── ...
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT (User Browser)                        │
│                   https://your-app.vercel.app                    │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                      Vercel CDN
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│           FRONTEND on Vercel                                       │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ React + Vite Application                                     │ │
│  │ ✓ Static site generation                                     │ │
│  │ ✓ Automatic deployments on git push                          │ │
│  │ ✓ Edge caching                                               │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬───────────────────────────────────────┘
                             │
                    API Calls (HTTPS)
              VITE_API_URL=backend-url/api
                             │
┌────────────────────────────▼───────────────────────────────────────┐
│          BACKEND on Render                                          │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Express.js API Server                                        │  │
│  │ ✓ Node.js Runtime                                            │  │
│  │ ✓ Automatic deployments on git push                          │  │
│  │ ✓ Persistent disk storage (JSON database)                    │  │
│  │ ✓ Built-in horizontal scaling                                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                       │
│  ┌──────────────────────────▼───────────────────────────────────┐  │
│  │ Data Storage                                                 │  │
│  │ /data/database.json (persistent disk)                        │  │
│  │ ✓ Services, Industries, Jobs, Resources                      │  │
│  │ ✓ Admin Users, Settings, Form Entries                        │  │
│  │ ✓ Footer Links                                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## GitHub Repositories

```
GitHub Account (github.com/YOUR_USERNAME)
│
├── omnitratech-frontend
│   Code: React, Vite, TypeScript
│   Deployment: Vercel
│   Trigger: Push to main branch
│   Build: npm run build → dist/
│   Deploy: Automatic (Vercel detects build)
│
└── omnitratech-backend
    Code: Node.js, Express, TypeScript
    Deployment: Render
    Trigger: Push to main branch
    Build: npm run build → dist/
    Deploy: Automatic (Render detects build)
```

---

## File Distribution After Split

### Backend Repository Files
```
omnitratech-backend/
├── src/
│   ├── server.ts
│   ├── controllers/
│   │   ├── servicesController.ts
│   │   ├── industriesController.ts
│   │   ├── jobsController.ts
│   │   └── resourcesController.ts
│   ├── routes/
│   │   ├── services.ts
│   │   ├── industries.ts
│   │   ├── jobs.ts
│   │   ├── resources.ts
│   │   ├── admin.ts
│   │   ├── footerLinks.ts
│   │   ├── formEntries.ts
│   │   └── settings.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── database/
│   │   └── db.ts
│   └── services/
│       └── adminDashboard.ts
├── data/
│   └── database.json
├── dist/                        (after build)
├── package.json
├── tsconfig.json
├── Dockerfile
├── render.yaml
├── .env.example
├── .gitignore
└── README.md
```

### Frontend Repository Files
```
omnitratech-frontend/
├── src/
│   └── (TypeScript source)
├── components/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Industries.tsx
│   ├── Resources.tsx
│   ├── Careers.tsx
│   ├── Contact.tsx
│   ├── AdminDashboard.tsx
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   └── ...
├── utils/
│   ├── api.ts
│   ├── apiClient.ts
│   ├── storage.ts
│   └── settings.tsx
├── public/
│   └── index.html
├── dist/                        (after build)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── docker-compose.yml
├── vercel.json
├── Dockerfile
├── .env.example
├── .gitignore
└── README.md
```

---

## Git Flow After Split

### Making Backend Changes
```
1. cd C:\Users\ASHUTOSH\Desktop\omnitratech-backend
2. Make code changes
3. git add .
4. git commit -m "Your message"
5. git push origin main
6. Render automatically deploys
```

### Making Frontend Changes
```
1. cd C:\Users\ASHUTOSH\Desktop\omnitratech-frontend
2. Make code changes
3. git add .
4. git commit -m "Your message"
5. git push origin main
6. Vercel automatically deploys
```

---

## Environment Variables Mapping

### Before: Environment Variables (Single Project)
```
PORT=3001
FRONTEND_URL=http://localhost:5175
VITE_API_URL=http://localhost:3001/api
```

### After: Environment Variables (Two Repos)

**Backend (Render) - .env**
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://your-site.vercel.app  ← Frontend URL
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
```

**Frontend (Vercel) - .env**
```
VITE_API_URL=https://your-api.onrender.com/api  ← Backend URL
```

---

## API Endpoints Location

### Before Split
```
Frontend (localhost:5175) ──proxy──► Backend (localhost:3001)
                          /api path
```

### After Split - Development
```
Frontend (localhost:5175) ──HTTP──► Backend (localhost:3001)
                         /api proxy
```

### After Split - Production
```
Frontend (vercel.app) ──HTTPS──► Backend (onrender.com)
                      /api (public URL)
```

---

## Database Persistence

### Before Split
```
omnitratech---digital-innovation/
└── backend/
    └── data/
        └── database.json
```

### After Split - Backend Repo
```
omnitratech-backend/
└── data/
    └── database.json
```

### After Split - Production (Render)
```
Render Persistent Disk
└── /opt/render/project/backend/data/
    └── database.json
```

---

## CI/CD Flow After Split

### Backend Deployment Flow
```
Push to GitHub (omnitratech-backend)
           │
           ▼
GitHub Webhook Triggers Render Build
           │
           ▼
Render: npm install && npm run build
           │
           ▼
Render: node dist/server.js (starts)
           │
           ▼
Backend Live on https://your-api.onrender.com
```

### Frontend Deployment Flow
```
Push to GitHub (omnitratech-frontend)
           │
           ▼
GitHub Webhook Triggers Vercel Build
           │
           ▼
Vercel: npm install && npm run build
           │
           ▼
Vercel: Static site to CDN
           │
           ▼
Frontend Live on https://your-site.vercel.app
```

---

## Summary: What Goes Where

| Component | Backend Repo | Frontend Repo |
|-----------|-------------|---------------|
| React code | ❌ NO | ✅ YES |
| Express server | ✅ YES | ❌ NO |
| TypeScript source | ✅ YES | ✅ YES |
| Vite config | ❌ NO | ✅ YES |
| package.json | ✅ YES | ✅ YES |
| Docker setup | ✅ YES | ✅ YES |
| Database code | ✅ YES | ❌ NO |
| Admin routes | ✅ YES | ❌ NO |
| Components | ❌ NO | ✅ YES |
| API client | ❌ NO | ✅ YES |
| Deployment config | ✅ (render.yaml) | ✅ (vercel.json) |

---

This architecture ensures clean separation of concerns and independent deployments!

