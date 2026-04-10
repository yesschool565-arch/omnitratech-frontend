# Docker Setup Guide for OmnitraTech

## Overview
The project now includes complete Docker support with `docker-compose.yml` for local development and containerized deployment.

## Architecture

### Services
- **Frontend**: React + Vite (port 5175)
- **Backend**: Express.js + Node.js (port 3001)
- **Network**: Custom bridge network for service communication

### Database
- JSON file-based storage mounted to `backend/data/`
- Persists between container restarts

## Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose v2.0+ (included with Docker Desktop)

## Quick Start

### 1. Build Images
```bash
docker-compose build
```

### 2. Start Services
```bash
docker-compose up -d
```

### 3. Access Applications
- **Frontend**: http://localhost:5175
- **Backend**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin
- **Health Check**: http://localhost:3001/health

### 4. Stop Services
```bash
docker-compose down
```

## Development Workflow

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild After Code Changes
```bash
# Rebuild frontend
docker-compose build frontend

# Rebuild backend
docker-compose build backend

# Restart services
docker-compose up -d
```

### Access Container Shell
```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh
```

### Check Service Status
```bash
docker-compose ps
```

## Advanced Commands

### Remove Containers and Volumes
```bash
docker-compose down -v
```

### Rebuild Without Cache
```bash
docker-compose build --no-cache
```

### Run One-off Command
```bash
docker-compose run backend npm run type-check
```

### View Image Sizes
```bash
docker images | grep omnitratech
```

## Environment Variables

### Frontend
- `VITE_API_URL`: http://backend:3001/api (inside Docker network)

### Backend
- `PORT`: 3001
- `NODE_ENV`: production
- `CORS_ORIGIN`: http://localhost:5175
- `ADMIN_USER`: admin
- `ADMIN_PASSWORD`: admin123
- `DB_TYPE`: json

### Modifying Environment
Edit `docker-compose.yml` in the `environment:` section of each service.

## Volumes

### Backend Data
- **Host Path**: `./backend/data`
- **Container Path**: `/app/data`
- **Purpose**: Persistent JSON database storage

All database files created in containers are saved to your local `backend/data/` directory.

## Networking

All services run in a custom bridge network (`omnitratech-network`) allowing them to communicate via service names:
- Frontend can reach backend at `http://backend:3001`
- Backend can reach frontend at `http://frontend:5175`

## Health Checks

### Backend Health Endpoint
- **URL**: `http://localhost:3001/health`
- **Response**: `{ "status": "OK", "timestamp": "..." }`
- **Check Interval**: 30 seconds
- **Auto-restart**: On 3 consecutive failures

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5175
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5175
kill -9 <PID>
```

### Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Rebuild
docker-compose build --no-cache backend
docker-compose up -d backend
```

### Database Not Persisting
```bash
# Verify volume is mounted
docker-compose exec backend ls -la /app/data

# Check host directory
ls -la backend/data/
```

### API Connection Issues
```bash
# Test from frontend container
docker-compose exec frontend curl http://backend:3001/health

# Test from host
curl http://localhost:3001/health
```

### Network Issues
```bash
# Inspect network
docker network inspect omnitratech_omnitratech-network

# Restart network
docker-compose down
docker-compose up -d
```

## Deployment

### Build for Production
```bash
# Build production images
docker-compose -f docker-compose.yml build --no-cache

# Tag for registry
docker tag omnitratech-frontend:latest your-registry/omnitratech-frontend:latest
docker tag omnitratech-backend:latest your-registry/omnitratech-backend:latest
```

### Push to Registry
```bash
docker push your-registry/omnitratech-frontend:latest
docker push your-registry/omnitratech-backend:latest
```

## Performance Tips

1. **Use BuildKit** for faster builds:
   ```bash
   DOCKER_BUILDKIT=1 docker-compose build
   ```

2. **Reduce Image Size**:
   - Multi-stage builds (already implemented)
   - Alpine Linux base images (already implemented)
   - Production dependencies only (already implemented)

3. **Cache Layers**: Dependencies are installed before copying source code for better caching

## File Structure
```
omnitratech/
├── Dockerfile (Frontend - multi-stage)
├── .dockerignore
├── docker-compose.yml
├── backend/
│   ├── Dockerfile (Backend - multi-stage)
│   ├── .dockerignore
│   ├── data/
│   │   └── database.json (persists here)
│   ├── src/
│   ├── dist/ (compiled JS after build)
│   └── package.json
├── src/
├── components/
└── package.json
```

## Next Steps

- Use Docker for local development
- Test production build locally: `docker-compose build` then deploy to Render
- Use `.dockerignore` to optimize image size
- Monitor container logs during development
- Set up CI/CD with Docker Hub or GitHub Container Registry

---

**Note**: For production deployment, refer to `DEPLOYMENT_GUIDE.md` for Vercel (frontend) and Render (backend) specific instructions.

