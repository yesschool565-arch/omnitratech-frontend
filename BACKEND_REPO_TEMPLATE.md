# Backend Repository Files Template

## Copy this to: backend/.gitignore

```
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
.project
.settings/
.classpath
```

---

## Copy this to: backend/README.md

```markdown
# OmnitraTech Backend API

Production-ready Express.js server for OmnitraTech platform built with TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or 20.x
- npm 8+

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm install
npm run build
npm start
```

## 📋 Environment Variables

Create `.env` file:
```
PORT=3001
NODE_ENV=production
CORS_ORIGIN=http://localhost:5175
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
DB_TYPE=json
```

See `.env.example` for all available options.

## 🐳 Docker

### Build
```bash
docker build -t omnitratech-backend .
```

### Run
```bash
docker run -p 3001:3001 \
  -e CORS_ORIGIN=http://localhost:5175 \
  -v $(pwd)/data:/app/data \
  omnitratech-backend
```

## 📡 API Endpoints

### Public
- `GET /health` - Health check
- `GET /api/services` - List services
- `GET /api/industries` - List industries
- `GET /api/jobs` - List jobs
- `GET /api/resources` - List resources
- `GET /api/settings` - Get site settings
- `GET /api/footer-links` - Get footer links
- `POST /api/form-entries` - Submit contact form

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/form-entries` - Get submissions
- `PUT /api/settings` - Update settings
- `POST /api/services` - Create service
- And more CRUD operations...

## 🔐 Admin Panel

Access at: `http://localhost:3001/admin`

Default credentials:
- Username: `admin`
- Password: `admin123`

⚠️ Change these in production!

## 📦 Database

JSON-based database stored in `/data/database.json`

No external database required!

## 🚀 Deployment

### Render
1. Connect GitHub repository
2. Build: `npm install && npm run build`
3. Start: `npm start`
4. Set environment variables in Render dashboard

See `render.yaml` for configuration.

## 📚 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: JSON (File-based)
- **Auth**: Bearer Token + JWT

## 📝 License
MIT
```

---

## Copy this entire section to: backend/package.json

Make sure these scripts are in your `package.json`:

```json
{
  "name": "omnitratech-backend",
  "version": "1.0.0",
  "description": "Backend API server for Omnitratech with Admin Panel",
  "main": "dist/server.js",
  "type": "module",
  "engines": {
    "node": "18.x || 20.x"
  },
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "express-async-errors": "^3.1.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "@types/cors": "^2.8.17",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "eslint": "^8.54.0",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2"
  }
}
```
