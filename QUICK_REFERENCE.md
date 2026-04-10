# 🎯 Quick Reference - Admin Panel & Backend

## 📍 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Web application |
| Backend API | http://localhost:3001/api | REST API |
| Admin Panel | http://localhost:3001/admin | Content management |
| Health Check | http://localhost:3001/health | Server status |

## 🔐 Default Credentials

```
Username: admin
Password: admin123
```

⚠️ **Change in production!**

## 🚀 Quick Start Commands

### Development

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev

# Terminal 2: Start Frontend
npm install
npm run dev
```

### Production

```bash
# Using Docker
docker-compose up -d

# Or manual
cd backend && npm install && npm run build && npm start
npm install && npm run build && npm preview
```

## 📊 Admin Panel Tabs

| Tab | Function | Default Form Fields |
|-----|----------|-------------------|
| **Services** | Manage services | Name, Description, Icon, Features |
| **Resources** | Manage resources | Title, Description, Category, URL |
| **Jobs** | Manage jobs | Title, Department, Location, Description, Requirements |
| **Industries** | Manage industries | Name, Description, Image, Expertise |

## 🔌 API Endpoints

### Public (No Auth Required)

```
GET    /api/services              # List services
GET    /api/services/:id          # Get service
GET    /api/resources             # List resources
GET    /api/resources/:id         # Get resource
GET    /api/jobs                  # List jobs
GET    /api/jobs/:id              # Get job
GET    /api/industries            # List industries
GET    /api/industries/:id        # Get industry
GET    /health                    # Health check
```

### Admin (Auth Required)

```
POST   /api/admin/login           # Get auth token
GET    /api/admin/stats           # Dashboard stats
GET    /api/admin/services        # List services
POST   /api/admin/services        # Create
PUT    /api/admin/services/:id    # Update
DELETE /api/admin/services/:id    # Delete
[Same pattern for resources, jobs, industries]
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── database/db.ts              ← Data storage logic
│   ├── routes/admin.ts             ← Admin endpoints
│   ├── middleware/auth.ts          ← Authentication
│   └── server.ts                   ← Main server
├── data/
│   └── database.json               ← Data file (created auto)
├── Dockerfile                      ← Docker config
└── .env                            ← Environment vars

components/
├── Admin*.tsx                      ← Admin components
└── *.tsx                           ← Other components

utils/
├── apiClient.ts                    ← API client library
└── ...
```

## 🔄 Data Flow

```
Admin Panel → POST /api/admin/[type] → Database → JSON File
                                        ↓
Frontend ← GET /api/[type] ← Database ← JSON File
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Admin panel 404 | Check backend running on 3001 |
| Login fails | Default: admin/admin123, check .env |
| Data not saving | Check `/backend/data/` exists |
| Port in use | Change PORT in .env or kill process |
| CORS error | Check FRONTEND_URL in backend .env |

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

## 📊 Data Structure Example

### Service
```json
{
  "id": "1712707800000",
  "name": "Cloud Solutions",
  "description": "Enterprise cloud services",
  "icon": "☁️",
  "features": "Scalability, Security, Speed",
  "createdAt": "2026-04-09T..."
}
```

### Job
```json
{
  "id": "1712707800001",
  "title": "Senior Developer",
  "department": "Engineering",
  "location": "Remote",
  "description": "Join our team...",
  "requirements": "5+ years, React, Node.js",
  "createdAt": "2026-04-09T..."
}
```

## 🔧 Operations

### Add Item
1. Click "Add [Type]" button
2. Fill form fields
3. Click "Save"
4. Success message appears

### Edit Item
1. Click "Edit" on item
2. Update values
3. Click "Save"
4. Changes reflected immediately

### Delete Item
1. Click "Delete" on item
2. Confirm deletion
3. Item removed
4. Dashboard stats updated

## 💾 Database

- **Location:** `/backend/data/database.json`
- **Type:** JSON file
- **Auto-created:** Yes (first run)
- **Backup:** Copy database.json file

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f backend

# Access container
docker-compose exec backend sh
```

## 🌐 CORS Configuration

Frontend is allowed to access backend from:
- `http://localhost:5173` (development)
- Set in backend `.env` via `FRONTEND_URL`

## 🔑 Authentication

Token format (for manual API testing):
```
Authorization: Bearer <base64-encoded-token>
```

Example:
```
Authorization: Bearer YWRtaW46MTcxMjcwNzgwMDAwMA==
```

## 📈 Scaling

For production:
1. ✅ Switch to MongoDB/PostgreSQL
2. ✅ Implement proper JWT auth
3. ✅ Add rate limiting
4. ✅ Enable HTTPS/TLS
5. ✅ Set up database backups
6. ✅ Add monitoring/logging
7. ✅ Implement caching
8. ✅ Add CDN for frontend

## 🚨 Security Checklist

- [ ] Change default admin credentials
- [ ] Use HTTPS in production
- [ ] Set strong JWT_SECRET
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Set up monitoring
- [ ] Enable audit logging
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Regular security updates

## 📚 Documentation Files

- `BACKEND_SETUP_GUIDE.md` - Complete setup guide
- `ADMIN_PANEL_SETUP.md` - Admin panel details
- `ADMIN_DATA_FLOW.md` - Data flow diagrams
- `ADMIN_PANEL.md` - Admin features overview
- `DEPLOYMENT.md` - Deployment guide
- `ARCHITECTURE.md` - System architecture

## 🎓 Learning Resources

1. **Express.js** - Backend framework
2. **TypeScript** - Type safety
3. **React** - Frontend framework
4. **Vite** - Build tool
5. **Docker** - Containerization

## 📞 Support

For issues:
1. Check error message console
2. Review documentation files
3. Check .env configuration
4. Verify ports availability
5. Check file permissions

---

**Last Updated:** April 9, 2026

**Version:** 1.0.0

**Status:** ✅ Ready for Development
