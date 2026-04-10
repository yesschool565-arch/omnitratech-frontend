# Omnitratech Backend - Complete Setup Guide

## Project Structure

```
backend/
├── src/
│   ├── server.ts           # Main Express server
│   ├── controllers/        # Request handlers
│   ├── routes/            # API routes
│   ├── services/          # Business logic & WordPress integration
│   └── middleware/        # Custom middleware
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env.example
```

## Features

✅ **Express.js REST API** - Clean, scalable architecture
✅ **WordPress Integration** - Headless CMS with REST API
✅ **TypeScript** - Type-safe backend development
✅ **Docker & Docker Compose** - Easy containerized deployment
✅ **CORS Enabled** - Secure frontend-backend communication
✅ **Error Handling** - Centralized error management
✅ **Request Logging** - Built-in request tracking

## Prerequisites

- **Node.js** 18+ or **Docker**
- **WordPress** (local or hosted)
- **npm** or **yarn**

---

## 🚀 Quick Start (Local Development)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5175
WORDPRESS_API_URL=http://localhost:8000/wp-json/wp/v2
```

### Step 3: Run Development Server

```bash
npm run dev
```

Server will start at `http://localhost:3000`

### Step 4: Test API

```bash
# Health check
curl http://localhost:3000/health

# Get all services
curl http://localhost:3000/api/services

# Get single service by slug
curl http://localhost:3000/api/services/web-development
```

---

## 🐳 Docker Setup

### Option 1: Using Docker Compose (Recommended)

Docker Compose starts everything: WordPress, MySQL, and Backend.

```bash
# From project root
docker-compose up -d

# Access:
# - WordPress: http://localhost:8000
# - Backend API: http://localhost:3000
# - API Health: http://localhost:3000/health
```

**First-time WordPress Setup:**
1. Visit http://localhost:8000
2. Complete WordPress installation
3. Install necessary plugins (see Plugins section below)
4. Create custom post types
5. Backend will automatically connect

### Option 2: Individual Docker Containers

```bash
# Build backend image
docker build -t omnitratech-backend ./backend

# Run backend
docker run -p 3000:3000 \
  -e WORDPRESS_API_URL=http://localhost:8000/wp-json/wp/v2 \
  -e FRONTEND_URL=http://localhost:5175 \
  omnitratech-backend

# Run WordPress separately
docker run -p 8000:80 \
  -e WORDPRESS_DB_HOST=your_db_host \
  -e WORDPRESS_DB_NAME=wordpress \
  -e WORDPRESS_DB_USER=wordpress \
  -e WORDPRESS_DB_PASSWORD=password \
  wordpress:latest
```

---

## 📋 WordPress Setup & Configuration

### Required WordPress Plugins

1. **[Advanced Custom Fields (ACF) Pro](https://www.advancedcustomfields.com/)**
   - Used for custom post type fields
   - Premium version recommended for custom post types
   - Community version (ACF Free) is available

2. **[Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)**
   - Create custom post types easily
   - Register: Services, Resources, Jobs, Industries

3. **[REST API](https://wordpress.org/plugins/rest-api/)** (usually built-in)
   - Enable REST API for post types

### Creating Custom Post Types in WordPress

#### Option A: Using Custom Post Type UI Plugin (Easy)

1. Go to WordPress Admin → Custom Post Types → Add New
2. Create post types:
   - **Service** (slug: `service`)
   - **Resource** (slug: `resource`)
   - **Job** (slug: `job`)
   - **Industry** (slug: `industry`)

#### Option B: Using Functions.php (Advanced)

Add to your WordPress theme's `functions.php`:

```php
// Register Service Post Type
register_post_type('service', [
    'label' => 'Services',
    'public' => true,
    'rest_base' => 'service',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail']
]);

// Register Resource Post Type
register_post_type('resource', [
    'label' => 'Resources',
    'public' => true,
    'rest_base' => 'resource',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail']
]);

// Register Job Post Type
register_post_type('job', [
    'label' => 'Jobs',
    'public' => true,
    'rest_base' => 'job',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail']
]);

// Register Industry Post Type
register_post_type('industry', [
    'label' => 'Industries',
    'public' => true,
    'rest_base' => 'industry',
    'supports' => ['title', 'editor', 'excerpt', 'thumbnail']
]);
```

### Setting Up ACF Fields

1. Install **Advanced Custom Fields Pro**
2. Go to Custom Fields → Add New
3. Create field groups for each post type:

**Service Post Type Fields:**
- `icon_name` (Text)
- `full_description` (Wysiwyg Editor)
- `benefits` (Repeater: Text)
- `features` (Repeater: icon_name, title, description)

**Resource Post Type Fields:**
- `category` (Text)
- `format` (Select: article, video, whitepaper, etc.)
- `read_time` (Text)

**Job Post Type Fields:**
- `department` (Text)
- `location` (Text)
- `job_type` (Select: Full-time, Part-time, Contract)
- `tags` (Repeater: Text)

**Industry Post Type Fields:**
- `icon_name` (Text)
- `featured_image` (Image)
- `features` (Repeater: icon_name, title, description)
- `solutions` (Repeater: Text)

---

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get single service

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get single resource

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job

### Industries
- `GET /api/industries` - Get all industries
- `GET /api/industries/:slug` - Get single industry

### Health Check
- `GET /health` - API health status

---

## 🔌 Frontend Integration

The frontend already has a proxy configured in `vite.config.ts`:

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
  }
}
```

### Update Frontend API Calls

Replace your existing API code with:

```typescript
// Frontend code - src/utils/api.ts
export const getServices = async () => {
  const response = await fetch('/api/services');
  return response.json();
};

export const getServiceBySlug = async (slug: string) => {
  const response = await fetch(`/api/services/${slug}`);
  return response.json();
};

// Similar for other resources...
```

---

## 🚢 Deployment

### Deploying Backend Only

#### Option 1: Heroku

```bash
# Create Heroku app
heroku create omnitratech-backend

# Set environment variables
heroku config:set WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
heroku config:set FRONTEND_URL=https://your-frontend-domain.com
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

#### Option 2: DigitalOcean App Platform

1. Connect GitHub repository
2. Set runtime to Node.js 18
3. Add environment variables in App Platform dashboard
4. Deploy

#### Option 3: AWS EC2

```bash
# On EC2 instance
git clone <your-repo>
cd backend
npm install
npm run build

# Run with PM2 (process manager)
npm install -g pm2
pm2 start dist/server.js --name "omnitratech-backend"
pm2 startup
pm2 save
```

#### Option 4: Docker on AWS ECS / Google Cloud Run

```bash
# Build and push to registry
docker build -t omnitratech-backend ./backend
docker tag omnitratech-backend:latest your-registry/omnitratech-backend:latest
docker push your-registry/omnitratech-backend:latest

# Deploy to cloud platform using pushed image
```

### Full Stack Deployment (Docker Compose)

For complete deployment with WordPress:

```bash
# On your server
docker-compose up -d

# Behind Nginx reverse proxy
# See deployment/nginx.conf
```

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Development with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **CORS**: Configure `FRONTEND_URL` properly for production
3. **Rate Limiting**: Consider adding rate limiting middleware
4. **Input Validation**: Validate all user inputs
5. **HTTPS**: Always use HTTPS in production
6. **API Keys**: Store WordPress auth tokens securely

---

## 📚 File Structure Explanation

```
/backend
├── src/
│   ├── server.ts           # Express app initialization
│   ├── controllers/
│   │   ├── servicesController.ts
│   │   ├── resourcesController.ts
│   │   ├── jobsController.ts
│   │   └── industriesController.ts
│   ├── routes/             # Express route definitions
│   │   ├── services.ts
│   │   ├── resources.ts
│   │   ├── jobs.ts
│   │   └── industries.ts
│   ├── services/
│   │   └── wordpressService.ts  # WordPress API integration
│   └── middleware/
│       ├── errorHandler.ts       # Global error handler
│       └── requestLogger.ts      # Request logging
├── dist/                   # Compiled output
├── package.json
├── tsconfig.json
└── Dockerfile
```

---

## 🐛 Troubleshooting

### Backend not connecting to WordPress

```bash
# Check WordPress API is accessible
curl http://localhost:8000/wp-json/wp/v2/service

# Verify environment variable
echo $WORDPRESS_API_URL
```

### Port 3000 already in use

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors

Ensure `FRONTEND_URL` in `.env` matches your frontend URL exactly.

---

## 📖 Next Steps

1. Set up WordPress with custom post types
2. Create test posts in each post type
3. Configure ACF fields
4. Test API endpoints
5. Update frontend components to use new API
6. Deploy to production

For more help, check the main project README or contact the development team.
