# Omnitratech - Architecture Overview

Complete full-stack setup with separate backend, WordPress CMS, and React frontend.

## 🏗 Architecture

```
┌─────────────────────────────────────────────────┐
│          React Frontend (Port 5175)             │
│  - Components: Services, Resources, Jobs, etc.  │
│  - Uses: React Router, Tailwind CSS             │
└──────────────────┬──────────────────────────────┘
                   │ API Calls (/api/*)
                   │
┌──────────────────▼──────────────────────────────┐
│    Node.js Backend API (Port 3000)              │
│  - Express.js REST API                          │
│  - Middleware: CORS, Error Handling, Logging    │
│  - Routes: Services, Resources, Jobs, Industries│
└──────────────────┬──────────────────────────────┘
                   │ REST API Calls
                   │
┌──────────────────▼──────────────────────────────┐
│    WordPress CMS (Port 8000)                    │
│  - Custom Post Types: Service, Resource, etc.   │
│  - Admin Dashboard for Content Management       │
│  - ACF (Advanced Custom Fields) for custom data │
│  - MySQL Database for persistence               │
└──────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
omnitratech-project/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   ├── components/
│   ├── utils/
│   ├── App.tsx
│   └── package.json
│
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/        # WordPress integration
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml        # Full stack deployment
├── nginx.conf               # Nginx reverse proxy (optional)
└── DEPLOYMENT.md            # Deployment guides
```

## 🚀 Getting Started

### Local Development (Option 1: Separate services)

**Terminal 1 - Frontend:**
```bash
npm install
npm run dev
# Runs on http://localhost:5175
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - WordPress (via Docker):**
```bash
docker run -p 8000:80 \
  -e WORDPRESS_DB_HOST=localhost \
  -e WORDPRESS_DB_NAME=wordpress \
  -e WORDPRESS_DB_USER=wordpress \
  -e WORDPRESS_DB_PASSWORD=password \
  wordpress:latest
```

### Local Development (Option 2: Docker Compose - All-in-One)

```bash
docker-compose up -d

# Access:
# - Frontend: http://localhost:5175
# - Backend: http://localhost:3000
# - WordPress: http://localhost:8000
# - WordPress Admin: http://localhost:8000/wp-admin
```

---

## 🌐 Key Components

### Frontend (`/`)
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **API Client**: Native Fetch API
- **Components**: Services, Resources, Jobs, Industries, Admin, etc.

### Backend (`/backend`)
- **Framework**: Express.js
- **Language**: TypeScript
- **Features**: 
  - REST API endpoints
  - WordPress integration via REST API
  - CORS support
  - Error handling
  - Request logging

### CMS (WordPress + Docker)
- **WordPress**: Headless CMS
- **Database**: MySQL
- **Plugins**: ACF, Custom Post Type UI
- **Custom Post Types**: Service, Resource, Job, Industry
- **REST API**: Full REST API enabled

---

## 📡 API Endpoints

All backend endpoints:

### Services
```
GET    /api/services              - Get all services
GET    /api/services/:slug        - Get single service by slug
```

### Resources
```
GET    /api/resources             - Get all resources
GET    /api/resources/:id         - Get single resource
```

### Jobs
```
GET    /api/jobs                  - Get all available jobs
GET    /api/jobs/:id              - Get single job
```

### Industries
```
GET    /api/industries            - Get all industries
GET    /api/industries/:slug      - Get single industry
```

### Health
```
GET    /health                    - API health status
```

---

## 🔧 Development Workflow

1. **Create Content in WordPress Admin**
   - Add Services, Resources, Jobs, Industries
   - Use ACF fields for custom data
   - Content is automatically available via REST API

2. **Backend Fetches from WordPress**
   - `wordpressService.ts` makes REST API calls to WordPress
   - Transforms data for frontend needs
   - Serves via standard REST endpoints

3. **Frontend Consumes Backend API**
   - Calls `/api/*` endpoints
   - Uses fetched data to render components
   - Displays content from WordPress

---

## 🐳 Docker & Deployment

### Docker Compose Services

1. **WordPress**: CMS dashboard
2. **MySQL**: Database for WordPress
3. **Backend**: Node.js API server

All services are networked and allow communication.

### Build Backend Docker Image

```bash
docker build -t omnitratech-backend ./backend
```

### Push to Registry

```bash
# Docker Hub
docker tag omnitratech-backend:latest username/omnitratech-backend:latest
docker push username/omnitratech-backend:latest

# Or GitHub Container Registry
docker tag omnitratech-backend:latest ghcr.io/username/omnitratech-backend:latest
docker push ghcr.io/username/omnitratech-backend:latest
```

---

## 🚢 Production Deployment

### Option 1: Full Stack (Docker Compose)

**On your server:**
```bash
git clone <repo>
cd project
docker-compose up -d
```

Access via domain configured in DNS/reverse proxy.

### Option 2: Separate Deployments

**Frontend**: Vercel, Netlify, AWS S3 + CloudFront
```bash
npm run build
# Deploy dist/ folder
```

**Backend**: Heroku, DigitalOcean, AWS EC2, Railway
```bash
cd backend
npm run build
# Deploy with `npm start` start command
```

**WordPress**: Managed WordPress hosting (Kinsta, WP Engine) or self-hosted

### Option 3: Kubernetes (Advanced)

For enterprise deployments with scaling requirements.

---

## 🔐 Security Considerations

1. **Environment Variables**: Use `.env` files (never commit)
2. **CORS**: Configure properly for production domains
3. **HTTPS**: Always use SSL/TLS in production
4. **WordPress**: Keep plugins and WordPress updated
5. **Database**: Use strong passwords, enable backups
6. **API Keys**: Rotate regularly, limit exposure
7. **Rate Limiting**: Implement on backend
8. **Input Validation**: Validate all user inputs

---

## 📚 Documentation

- [Backend Setup Guide](./backend/README.md) - Comprehensive backend documentation
- [Deployment Guide](./DEPLOYMENT.md) - Detailed deployment instructions
- [WordPress Setup](./backend/README.md#-wordpress-setup--configuration) - WordPress configuration

---

## 🤝 Development Commands

### Frontend
```bash
npm install                # Install dependencies
npm run dev               # Start dev server
npm run build             # Build for production
npm run preview           # Preview production build
```

### Backend
```bash
cd backend
npm install               # Install dependencies
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript
npm start                # Start production server
npm run type-check       # Check TypeScript
npm run lint             # Run ESLint
```

### Docker
```bash
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
docker ps               # List running containers
```

---

## 🐛 Common Issues

### Q: Backend won't connect to WordPress
**A:** Check WordPress REST API is enabled and `WORDPRESS_API_URL` is correct

### Q: CORS errors in frontend
**A:** Ensure `FRONTEND_URL` in backend `.env` matches your frontend domain

### Q: Port already in use
**A:** Kill process: `lsof -i :PORT` (Mac/Linux) or configure different port

### Q: WordPress won't start with Docker
**A:** Check database is running: `docker ps` and verify `WORDPRESS_DB_PASSWORD`

---

## 📞 Support Resources

- [Express.js Docs](https://expressjs.com/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🎯 Next Steps

1. ✅ Set up backend (Done!)
2. ⬜ Configure WordPress
3. ⬜ Update frontend to use backend API
4. ⬜ Deploy frontend
5. ⬜ Deploy backend
6. ⬜ Deploy WordPress
7. ⬜ Set up domain & SSL
8. ⬜ Configure monitoring

---

**Architecture Version**: 1.0  
**Last Updated**: 2026-04-09  
**Maintained By**: Development Team
