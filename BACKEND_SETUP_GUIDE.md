# 🚀 Omnitratech Backend & Admin Panel - Complete Setup Guide

## Overview

Your Omnitratech project now has a complete backend system with an admin panel for managing all site content. No WordPress required!

## What's Included

### ✅ Backend System
- **Node.js/Express API** running on port 3001
- **Admin Dashboard** at `http://localhost:3001/admin`
- **JSON-based Database** for storing content
- **RESTful API** for frontend and public access
- **Docker Support** for easy deployment

### ✅ Admin Panel Features
- **Services Management** - Create, edit, delete services
- **Resources Management** - Manage learning resources and documentation
- **Jobs Management** - Post job openings and career opportunities
- **Industries Management** - Manage industry verticals
- **Real-time Updates** - Changes immediately available to frontend
- **Simple Authentication** - Login system for admin access
- **Statistics Dashboard** - Quick overview of all content

### ✅ API Endpoints
- Public API endpoints for frontend consumption
- Separate admin API with authentication
- Health check endpoint
- All data persisted to JSON file

## Quick Start (Local Development)

### 1. Install Dependencies

```bash
# Backend setup
cd backend
npm install
cd ..

# Frontend setup
npm install
```

### 2. Start Services

**Option A: Using separate terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

**Option B: Using PowerShell script (Windows)**
```powershell
./start-dev.ps1
```

### 3. Access the Applications

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Admin Panel:** http://localhost:3001/admin
- **Health Check:** http://localhost:3001/health

### 4. Login to Admin Panel

Open http://localhost:3001/admin

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

## Admin Panel Walkthrough

### Adding a Service

1. Click **"Services"** tab
2. Click **"Add Service"** button
3. Fill in the form:
   - Service Name: e.g., "Cloud Solutions"
   - Description: Service details
   - Icon URL: Image URL or emoji
   - Features: Comma-separated list
4. Click **"Save"**

### Adding a Resource

1. Click **"Resources"** tab
2. Click **"Add Resource"** button
3. Fill in:
   - Title: Resource name
   - Description: Details
   - Category: e.g., "Tutorial"
   - URL: Link to resource
4. Click **"Save"**

### Adding a Job

1. Click **"Jobs"** tab
2. Click **"Add Job"** button
3. Fill in:
   - Job Title: Position name
   - Department: Team name
   - Location: Work location
   - Description: Job details
   - Requirements: Required skills
4. Click **"Save"**

### Adding an Industry

1. Click **"Industries"** tab
2. Click **"Add Industry"** button
3. Fill in:
   - Industry Name: e.g., "Healthcare"
   - Description: Industry focus
   - Image URL: Industry image
   - Expertise: Skills/expertise list
4. Click **"Save"**

## Docker Deployment

### Local Docker Build

```bash
# Build and start all services
docker-compose up --build

# Access the services
# Frontend:   http://localhost:5173
# Backend:    http://localhost:3001
# Admin:      http://localhost:3001/admin
# WordPress:  http://localhost:8000 (optional)
```

### Production Docker Push

```bash
# Tag images
docker tag omnitratech-backend:latest your-registry/omnitratech-backend:latest
docker tag omnitratech-frontend:latest your-registry/omnitratech-frontend:latest

# Push to registry
docker push your-registry/omnitratech-backend:latest
docker push your-registry/omnitratech-frontend:latest
```

## Project Structure

```
omnitratech-project/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   └── db.ts              # JSON database service
│   │   ├── routes/
│   │   │   ├── admin.ts           # Admin API routes
│   │   │   ├── services.ts
│   │   │   ├── resources.ts
│   │   │   ├── jobs.ts
│   │   │   └── industries.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts            # Authentication middleware
│   │   │   ├── errorHandler.ts
│   │   │   └── requestLogger.ts
│   │   ├── controllers/           # Route handlers
│   │   ├── services/
│   │   │   └── adminDashboard.ts  # Admin dashboard HTML
│   │   └── server.ts              # Main server file
│   ├── data/
│   │   └── database.json          # Persisted data (auto-created)
│   ├── .env                       # Backend environment variables
│   ├── Dockerfile                 # Docker configuration
│   ├── package.json
│   └── tsconfig.json
├── components/                    # React components
├── utils/
│   ├── api.ts
│   └── apiClient.ts              # Frontend API client
├── .env.example                  # Frontend env example
├── docker-compose.yml            # Docker compose configuration
├── Dockerfile                    # Frontend Dockerfile
├── package.json
└── vite.config.ts
```

## API Documentation

### Authentication

```bash
# Login to get token
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Use token in requests
curl http://localhost:3001/api/admin/services \
  -H "Authorization: Bearer <token>"
```

### Admin API Endpoints

All require authentication via `Authorization: Bearer <token>` header.

#### Services
```
GET    /api/admin/services           # List all services
POST   /api/admin/services           # Create service
PUT    /api/admin/services/:id       # Update service
DELETE /api/admin/services/:id       # Delete service
```

#### Resources
```
GET    /api/admin/resources          # List all resources
POST   /api/admin/resources          # Create resource
PUT    /api/admin/resources/:id      # Update resource
DELETE /api/admin/resources/:id      # Delete resource
```

#### Jobs
```
GET    /api/admin/jobs               # List all jobs
POST   /api/admin/jobs               # Create job
PUT    /api/admin/jobs/:id           # Update job
DELETE /api/admin/jobs/:id           # Delete job
```

#### Industries
```
GET    /api/admin/industries         # List all industries
POST   /api/admin/industries         # Create industry
PUT    /api/admin/industries/:id     # Update industry
DELETE /api/admin/industries/:id     # Delete industry
```

#### Stats
```
GET    /api/admin/stats              # Get dashboard statistics
```

### Public API Endpoints

No authentication required.

```
GET    /api/services               # All services
GET    /api/services/:id           # Single service
GET    /api/resources              # All resources
GET    /api/resources/:id          # Single resource
GET    /api/jobs                   # All jobs
GET    /api/jobs/:id               # Single job
GET    /api/industries             # All industries
GET    /api/industries/:id         # Single industry
GET    /health                     # Health check
```

## Frontend Integration

The frontend automatically uses the backend API. Environment variable:

```env
VITE_API_URL=http://localhost:3001/api
```

For production, update this to your backend URL.

## Environment Variables

### Backend (.env)
```env
PORT=3001                              # Backend port
FRONTEND_URL=http://localhost:5173     # Frontend URL for CORS
NODE_ENV=development|production        # Environment
ADMIN_USER=admin                       # Admin username
ADMIN_PASSWORD=admin123                # Admin password
DB_TYPE=json                           # Database type
JWT_SECRET=your-secret-key             # JWT signing key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api # Backend API URL
```

## Deployment Options

### Option 1: Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Option 2: Cloud Platforms

**Vercel (Frontend)**
- Connect your repo to Vercel
- Set `VITE_API_URL` to your backend URL
- Deploy

**AWS, GCP, Azure (Backend)**
- Use Dockerfile for backend deployment
- Set environment variables
- Use persistent volume for database

### Option 3: Traditional VPS
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs

# Clone repo
git clone <repo-url>
cd omnitratech

# Backend
cd backend
npm install
npm run build
npm start

# Frontend (separate terminal or PM2)
npm install
npm run build
npm preview
```

## Production Checklist

- [ ] Change default admin credentials
- [ ] Set up HTTPS
- [ ] Configure proper JWT secrets
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Configure rate limiting
- [ ] Enable CORS properly
- [ ] Use environment variables for secrets
- [ ] Set up CI/CD pipeline
- [ ] Enable data encryption
- [ ] Set up automated backups

## Troubleshooting

### Admin Panel Not Loading
- Ensure backend is running: `cd backend && npm run dev`
- Check port 3001 is not in use
- Check browser console for errors
- Clear browser cache

### Frontend Not Fetching Data
- Verify backend is running
- Check `VITE_API_URL` environment variable
- Check browser console for CORS errors
- Verify API endpoints are correct

### Database Not Persisting
- Check `/backend/data` directory exists
- Ensure write permissions on the directory
- For Docker: verify volume mount

### Port Already in Use
```bash
# Change port in .env or:
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3001   # Windows
```

## Support & Documentation

- **Admin Setup Guide:** See `ADMIN_PANEL_SETUP.md`
- **API Documentation:** See `ADMIN_PANEL_SETUP.md` (API section)
- **Architecture:** See `ARCHITECTURE.md`
- **Deployment:** See `DEPLOYMENT.md`

## Security Notes

1. **Change Admin Credentials:** Update default admin/admin123 immediately
2. **Use HTTPS:** Always use HTTPS in production
3. **Secure Secrets:** Store JWT_SECRET and passwords securely
4. **CORS:** Configure CORS properly for your domain
5. **Backups:** Implement regular database backups
6. **Rate Limiting:** Add rate limiting on API endpoints
7. **Input Validation:** Validate all user inputs
8. **Audit Logs:** Implement audit logging for admin actions

## Next Steps

1. **Customize Admin Panel:** Modify colors/branding in `admin-dashboard.ts`
2. **Add User Roles:** Implement different admin permission levels
3. **Database Migration:** Migrate to MongoDB or PostgreSQL
4. **Email Notifications:** Add email alerts for new jobs/updates
5. **Content Versioning:** Implement content version history
6. **API Rate Limiting:** Add rate limiting and throttling
7. **Analytics:** Integrate analytics for tracking

## System Requirements

- Node.js 18 or higher
- npm or yarn
- Docker & Docker Compose (for Docker deployment)
- 512MB RAM minimum
- 1GB storage (for database)

## License

Your project license here.

---

**Need help?** Contact support or create an issue in your repository.
