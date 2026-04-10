# Quick Start Guide - Omnitratech Full Stack Setup

Get your complete system running in 5 minutes!

---

## ⚡ 5-Minute Quick Start

### Step 1: Frontend Setup (1 min)

```bash
# Install dependencies
npm install

# Start dev server (port 5175)
npm run dev
```

✅ Frontend running at http://localhost:5175

---

### Step 2: Backend Setup (1 min)

```bash
# Install backend dependencies
cd backend
npm install

# Copy and configure environment
cp .env.example .env

# Start backend dev server (port 3000)
npm run dev
```

✅ Backend running at http://localhost:3000/health

---

### Step 3: WordPress Setup (3 min with Docker)

```bash
# Start WordPress + MySQL (from project root)
docker-compose up -d

# Wait 30 seconds for WordPress to start
sleep 30

# Access WordPress
# Admin: http://localhost:8000/wp-admin
# Default: admin / wordpress (or as configured)
```

✅ WordPress running at http://localhost:8000

---

## 🎯 Next: Configure WordPress (5 minutes)

### 1. Complete WordPress Setup
- Visit http://localhost:8000
- Complete the 5-minute installation
- Create admin user
- Note the password

### 2. Install Required Plugins
1. Go to Admin → Plugins → Add New
2. Search and install:
   - "Advanced Custom Fields"
   - "Custom Post Type UI"
3. Activate both plugins

### 3. Create Custom Post Types
1. Go to Admin → Custom Post Types UI
2. Create these post types:
   - **Service** (slug: `service`)
   - **Resource** (slug: `resource`)
   - **Job** (slug: `job`)
   - **Industry** (slug: `industry`)

### 4. Create Sample Content

Go to each post type and add sample content:

**Service Example:**
- Title: "Web Development"
- Content: "Professional web development services..."
- Icon Name: "Code"

**Resource Example:**
- Title: "Getting Started Guide"
- Content: "Complete guide to..."
- Category: "Guides"

---

## 🔌 Test the Integration

### Test 1: API Health Check
```bash
curl http://localhost:3000/health
# Response: {"status":"OK","timestamp":"..."}
```

### Test 2: Get Services
```bash
curl http://localhost:3000/api/services
# Response: [{"id":1,"slug":"web-development","title":"Web Development",...}]
```

### Test 3: Frontend Integration
Visit http://localhost:5175 and verify data loads from WordPress

---

## 📝 Update Frontend Components

### Example: Update Services Component

**Before (using mock data):**
```typescript
// Old approach
const [services, setServices] = useState([
  { id: 1, title: "Web Development", ... },
  // ... mock data
]);
```

**After (using backend API):**
```typescript
import { servicesAPI } from '../utils/apiClient';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    servicesAPI.getAll().then(setServices);
  }, []);

  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

### Example: Get Single Service by Slug

```typescript
import { servicesAPI } from '../utils/apiClient';
import { useParams } from 'react-router-dom';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    servicesAPI.getBySlug(slug!).then(setService);
  }, [slug]);

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.fullDescription}</p>
      {/* ... */}
    </div>
  );
}
```

---

## 📂 Project Structure

```
omnitratech/
├── frontend files (App.tsx, index.tsx, etc.)
├── components/
├── utils/
│   └── apiClient.ts           ← Use this in components
├── backend/
│   └── src/
│       ├── server.ts
│       ├── routes/
│       └── services/ (WordPress integration)
├── docker-compose.yml         ← Manages WordPress + MySQL
├── ARCHITECTURE.md            ← System design
├── DEPLOYMENT.md              ← Production deployment
├── ADMIN_GUIDE.md             ← WordPress management
└── QUICK_START.md             ← This file
```

---

## 🚀 Environment Files

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```env
PORT=3000
WORDPRESS_API_URL=http://localhost:8000/wp-json/wp/v2
FRONTEND_URL=http://localhost:5175
NODE_ENV=development
```

---

## 🔗 Important URLs

| Service | Local URL | Purpose |
|---------|-----------|---------|
| Frontend | http://localhost:5175 | React app |
| Backend | http://localhost:3000 | REST API |
| Backend Health | http://localhost:3000/health | API status |
| WordPress | http://localhost:8000 | CMS front |
| WordPress Admin | http://localhost:8000/wp-admin | Management |
| API Services | http://localhost:3000/api/services | Test endpoint |

---

## ✅ Verification Checklist

- [ ] `npm run dev` works in frontend directory
- [ ] `npm run dev` works in backend directory
- [ ] `docker-compose up -d` starts all services
- [ ] http://localhost:3000/health returns OK
- [ ] http://localhost:8000/wp-admin is accessible
- [ ] WordPress plugins are installed
- [ ] Custom post types are created
- [ ] Sample content is added to each post type
- [ ] http://localhost:3000/api/services returns JSON data
- [ ] Frontend loads and displays content

---

## 🐛 Quick Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Docker issues?**
```bash
docker-compose down
docker-compose up -d --build
```

**WordPress not loading?**
```bash
# Wait 60 seconds for MySQL to start
# Then check:
docker logs omnitratech-mysql
```

**Backend can't reach WordPress?**
- Update `.env`: `WORDPRESS_API_URL=http://wordpress/wp-json/wp/v2`
- Restart backend: `npm run dev`

---

## 📚 Full Documentation

- **Architecture**: Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Backend Details**: Read [backend/README.md](./backend/README.md)
- **Deployment**: Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Admin/CMS**: Read [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

---

## 🎓 Learning Path

1. ✅ **Current**: Get everything running locally
2. → **Next**: Update frontend components to use API
3. → **Then**: Configure production deployment
4. → **Finally**: Deploy to live servers

---

## 💡 Pro Tips

1. **Keep terminals open**: Use multiple terminal tabs for frontend, backend, and Docker logs
2. **Use VS Code**: Install REST Client extension to test API endpoints
3. **Check Docker logs**: `docker logs omnitratech-backend` for debugging
4. **Reload data**: Browser cache might show old data; press Ctrl+Shift+R
5. **WordPress Tips**: ACF is key for custom fields; set them up correctly

---

## 🆘 Need Help?

**Backend not responding?**
```bash
curl http://localhost:3000/health
# If no response: check backend is running, check logs
```

**Frontend error?**
- Check browser console (F12)
- Check Network tab for failed API calls
- Check .env file configuration

**WordPress issues?**
- Visit http://localhost:8000/wp-admin
- Check plugins are activated
- Ensure custom post types are created

---

## 🎉 You're Ready!

Your full-stack development environment is running. Start updating your frontend components to use the backend API!

**Still have questions?** Check the detailed documentation files:
- ARCHITECTURE.md
- backend/README.md
- DEPLOYMENT.md
- ADMIN_GUIDE.md
