# Backend Admin Panel Setup Guide

## Quick Start

### 1. **Install Dependencies**
```bash
cd backend
npm install
```

### 2. **Run in Development**
```bash
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. **Access Admin Dashboard**
Open your browser and navigate to: `http://localhost:3001/admin`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

## Demo Data

You can add sample data through the admin panel:

### Sample Services
```json
{
  "name": "Cloud Solutions",
  "description": "Enterprise-grade cloud infrastructure and services",
  "icon": "☁️",
  "features": "Scalability, Security, 24/7 Support"
}
```

### Sample Jobs
```json
{
  "title": "Senior DevOps Engineer",
  "department": "Engineering",
  "location": "New York, NY",
  "description": "Looking for experienced DevOps engineer...",
  "requirements": "5+ years experience, Docker, Kubernetes"
}
```

### Sample Resources
```json
{
  "title": "Cloud Architecture Guide",
  "description": "Complete guide to designing scalable architectures",
  "category": "Tutorial",
  "url": "https://example.com/guide"
}
```

### Sample Industries
```json
{
  "name": "Healthcare",
  "description": "Digital solutions for healthcare sector",
  "image": "https://example.com/healthcare.jpg",
  "expertise": "HIPAA Compliance, Patient Management, Analytics"
}
```

## Admin API Endpoints

All admin endpoints require authentication via Bearer token.

### Authentication
```
POST /api/admin/login
{
  "username": "admin",
  "password": "admin123"
}
```

### Services Management
```
GET    /api/admin/services        - Get all services
POST   /api/admin/services        - Create service
PUT    /api/admin/services/:id    - Update service
DELETE /api/admin/services/:id    - Delete service
```

### Resources Management
```
GET    /api/admin/resources       - Get all resources
POST   /api/admin/resources       - Create resource
PUT    /api/admin/resources/:id   - Update resource
DELETE /api/admin/resources/:id   - Delete resource
```

### Jobs Management
```
GET    /api/admin/jobs            - Get all jobs
POST   /api/admin/jobs            - Create job
PUT    /api/admin/jobs/:id        - Update job
DELETE /api/admin/jobs/:id        - Delete job
```

### Industries Management
```
GET    /api/admin/industries      - Get all industries
POST   /api/admin/industries      - Create industry
PUT    /api/admin/industries/:id  - Update industry
DELETE /api/admin/industries/:id  - Delete industry
```

### Stats
```
GET    /api/admin/stats           - Get dashboard statistics
```

## Public API Endpoints

These endpoints are available without authentication:

```
GET /api/services              - Get all services
GET /api/services/:id          - Get service by ID
GET /api/resources             - Get all resources
GET /api/resources/:id         - Get resource by ID
GET /api/jobs                  - Get all jobs
GET /api/jobs/:id              - Get job by ID
GET /api/industries            - Get all industries
GET /api/industries/:id        - Get industry by ID
GET /health                    - Health check
```

## Docker Deployment

### Build and Run with Docker Compose
```bash
docker-compose up --build
```

This will start:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001
- **Admin Panel:** http://localhost:3001/admin
- **WordPress:** http://localhost:8000 (optional)

### Backend Data
- Data is persisted in `./backend/data/database.json`
- Data is also mounted in Docker at `/app/data`

## Environment Variables

For production, update the `.env` file:

```env
PORT=3001
FRONTEND_URL=http://your-domain.com
NODE_ENV=production
ADMIN_USER=your-admin-username
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-secret-key
```

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### Admin panel not loading
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify FRONTEND_URL environment variable

### Data not persisting
- Check if `./backend/data` directory exists
- Ensure write permissions for `/backend/data`
- In Docker, verify volume mount

### Login not working
- Default credentials: admin/admin123
- Check .env file for ADMIN_USER and ADMIN_PASSWORD
- Clear browser local storage and try again

## Next Steps

1. Add authentication security (JWT tokens)
2. Implement database backup
3. Add user management
4. Implement audit logs
5. Add webhooks for data changes
