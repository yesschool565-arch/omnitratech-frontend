# Deployment Guide - Omnitratech Full Stack

Complete guide for deploying frontend, backend, and WordPress separately or as a complete stack.

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [WordPress Deployment](#wordpress-deployment)
5. [Full Stack Deployment](#full-stack-deployment)
6. [Domain & DNS Setup](#domain--dns-setup)
7. [SSL/HTTPS](#sslhttps)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Quick Reference

| Component | Local | Staging | Production |
|-----------|-------|---------|-----------|
| Frontend | Port 5175 | Vercel/Netlify | Production Domain |
| Backend | Port 3000 | Heroku/Railway | Production Domain |
| WordPress | Port 8000 | Managed Hosting | Managed Hosting |
| Database | Local MySQL | Cloud DB | Cloud DB |

---

## Backend Deployment

### Option 1: Railway.app (Recommended - Easy)

Railway provides free tier with automatic deployments from GitHub.

**Steps:**
1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Sign in with GitHub
4. Click "New Project" → "Deploy from GitHub repo"
5. Select your repository
6. Railway auto-detects Node.js
7. Add environment variables:
   - `WORDPRESS_API_URL` = `https://your-wordpress-site.com/wp-json/wp/v2`
   - `FRONTEND_URL` = `https://your-frontend-domain.com`
   - `PORT` = `3000` (auto-assigned)
8. Deploy!

**Cost**: Free tier includes 500 project hours/month

---

### Option 2: Heroku

```bash
# Install Heroku CLI
brew install heroku  # Mac
# or download from heroku.com

# Login
heroku login

# Create app
heroku create omnitratech-api

# Add buildpack (usually auto-detected)
heroku buildpacks:add heroku/nodejs --app omnitratech-api

# Set environment variables
heroku config:set NODE_ENV=production --app omnitratech-api
heroku config:set WORDPRESS_API_URL=https://your-site.com/wp-json/wp/v2 --app omnitratech-api
heroku config:set FRONTEND_URL=https://your-frontend.com --app omnitratech-api

# Deploy
git push heroku main

# View logs
heroku logs --tail --app omnitratech-api

# Access
https://omnitratech-api.herokuapp.com
```

**Cost**: Free tier deprecated; paid plans start at $7/month

---

### Option 3: DigitalOcean App Platform

**Steps:**
1. Push to GitHub
2. Go to DigitalOcean → App Platform
3. Click "Create App"
4. Select "GitHub" → Choose your repo
5. Select branch (main)
6. Choose region
7. Add environment variables:
   - `WORDPRESS_API_URL`
   - `FRONTEND_URL`
8. Set build command: `npm run build`
9. Set run command: `npm start`
10. Choose plan and deploy

**Cost**: $5-12/month

---

### Option 4: AWS EC2

**Setup:**
```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/your-org/omnitratech.git
cd omnitratech/backend

# Install deps
npm install

# Build
npm run build

# Install PM2 (process manager)
sudo npm install -g pm2

# Start with PM2
pm2 start dist/server.js --name "omnitratech-api"

# Make PM2 start on reboot
pm2 startup
pm2 save

# View status
pm2 status
pm2 logs omnitratech-api
```

**Setup Nginx Reverse Proxy:**
```bash
sudo apt install nginx

# Edit nginx config
sudo nano /etc/nginx/sites-available/default
```

Add to config:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Restart nginx
sudo systemctl restart nginx
```

**Cost**: Varies; ~$5-20/month

---

### Option 5: Docker on Kubernetes (Advanced)

```bash
# Build image
docker build -t omnitratech-backend ./backend
docker tag omnitratech-backend:latest your-registry/omnitratech-backend:latest
docker push your-registry/omnitratech-backend:latest

# Deploy to cloud (GKE, EKS, AKS, DigitalOcean Kubernetes)
kubectl apply -f k8s-deployment.yaml
```

**Cost**: Varies; typically $10+/month

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

Optimized for React/Next.js, free tier available.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow prompts
# - Select project name
# - Choose framework: Vite
# - Build command: npm run build
# - Output directory: dist

# Set environment variables in Vercel dashboard
# - VITE_API_URL = https://your-api-domain.com
```

**Cost**: Free tier available; Pro $20/month

---

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist

# Or connect GitHub for automatic deployments
```

**Cost**: Free tier available

---

### Option 3: AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# CloudFront handles caching and HTTPS
```

**Cost**: Very low; ~$1-5/month

---

### Option 4: GitHub Pages (Free but limited)

```bash
# Update vite.config.ts
export default {
  base: '/omnitratech/',
  // ... rest of config
}

# Build
npm run build

# Deploy to gh-pages branch
npm run deploy-gh-pages
```

**Cost**: Free

---

## WordPress Deployment

### Option 1: Managed WordPress Hosting (Recommended)

Choose a managed host (no server management):

**Popular Options:**
- [Kinsta](https://kinsta.com/) - $35-100/month
- [WP Engine](https://wpengine.com/) - $20-115/month
- [Flywheel](https://getflywheel.com/) - $12-95/month
- [SiteGround](https://www.siteground.com/) - $3.99-8.99/month

**Setup:**
1. Purchase hosting plan
2. Install WordPress (usually one-click)
3. Install plugins: ACF, Custom Post Type UI
4. Create custom post types
5. Add content
6. Enable REST API (usually default)
7. Note API URL: `https://your-site.com/wp-json/wp/v2`

---

### Option 2: Self-Hosted on Linode/DigitalOcean

**Linode:**
```bash
# Create Linode → Select region → Choose plan

# SSH in and install LAMP stack
# Follow Linode docs: https://www.linode.com/docs/guides/install-wordpress/

# Or use Linode Marketplace app (one-click WordPress)
```

**Cost**: $5-20/month

---

### Option 3: Docker on AWS/DigitalOcean

```bash
# Use docker-compose.yml for WordPress + MySQL

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Backup volumes
docker-compose exec -T mysql mysqldump -u wordpress -ppassword wordpress_db > backup.sql
```

**Cost**: Varies

---

## Full Stack Deployment

### Using Docker Compose on Server

**Prerequisites:**
- Server with Docker & Docker Compose (DigitalOcean, AWS, Linode)
- Domain names configured

**Steps:**

1. **SSH into server:**
```bash
ssh user@your-server-ip
```

2. **Clone repository:**
```bash
git clone https://github.com/your-org/omnitratech.git
cd omnitratech
```

3. **Update docker-compose.yml for production:**

Create `docker-compose.prod.yml`:
```yaml
version: '3.8'

services:
  wordpress:
    environment:
      WORDPRESS_DB_HOST: mysql:3306
    restart: always

  mysql:
    restart: always

  backend:
    restart: always
    environment:
      WORDPRESS_API_URL: http://wordpress/wp-json/wp/v2
      FRONTEND_URL: https://your-domain.com

networks:
  omnitratech-network:
    driver: bridge
```

4. **Start services:**
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

5. **Setup Nginx:**

```bash
sudo apt update && sudo apt install nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
upstream backend {
    server localhost:3000;
}

upstream wordpress {
    server localhost:8000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    server_name api.your-domain.com;
    server_name admin.your-domain.com;

    # Frontend
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://frontend;  # Your frontend server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 443 ssl http2;
    server_name api.your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen 443 ssl http2;
    server_name admin.your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://wordpress;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

6. **Enable SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx

sudo certbot certonly --standalone -d your-domain.com -d api.your-domain.com -d admin.your-domain.com

sudo systemctl restart nginx
```

7. **Verify services:**
```bash
docker ps  # Check running containers
curl http://localhost:3000/health  # Test backend
```

---

## Domain & DNS Setup

### Point Your Domain to Server

1. **Go to Domain Registrar** (GoDaddy, Namecheap, etc.)
2. **Edit DNS Records** (A Records):

```
your-domain.com          A    123.45.67.89 (Your Server IP)
www.your-domain.com      A    123.45.67.89
api.your-domain.com      A    123.45.67.89
admin.your-domain.com    A    123.45.67.89
```

3. **Wait for DNS Propagation** (5-48 hours)
4. **Test**: `ping your-domain.com`

---

## SSL/HTTPS

### Let's Encrypt (Free)

```bash
# On server with Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone \
  -d your-domain.com \
  -d api.your-domain.com \
  -d admin.your-domain.com \
  -d www.your-domain.com

# Auto-renew
sudo systemctl enable certbot.timer

# Check renewal
sudo certbot renew --dry-run
```

### Update Backend Environment

```enodulevar
FRONTEND_URL=https://your-domain.com
WORDPRESS_API_URL=https://admin.your-domain.com/wp-json/wp/v2
NODE_ENV=production
```

---

## Monitoring & Maintenance

### Backend Monitoring

```bash
# Check if backend is running
curl https://api.your-domain.com/health

# View logs
docker logs -f omnitratech-backend

# or PM2 logs (if using PM2)
pm2 logs omnitratech-api
```

### Database Backups

```bash
# Backup WordPress database
docker exec omnitratech-mysql mysqldump -u wordpress -ppassword wordpress_db > backup-$(date +%Y%m%d).sql

# Restore from backup
docker exec -i omnitratech-mysql mysql -u wordpress -ppassword wordpress_db < backup.sql
```

### Update Applications

```bash
# Pull latest code
git pull origin main

# Rebuild backend
docker build -t omnitratech-backend ./backend

# Restart services
docker-compose restart backend

# WordPress updates through admin panel
```

### Performance Optimization

1. **Enable Caching**: Use Redis or Memcached
2. **CDN**: Use CloudFront or Cloudflare
3. **Database Optimization**: Regular WordPress maintenance
4. **Rate Limiting**: Prevent API abuse
5. **Compression**: Enable gzip on Nginx

---

## Troubleshooting Deployment

### Backend Won't Start
```bash
# Check logs
docker logs omnitratech-backend

# Verify environment variables
docker inspect omnitratech-backend | grep -A 20 "Env"

# Check port availability
netstat -tuln | grep 3000
```

### Cannot Connect to WordPress API
```bash
# Check WordPress health
curl https://admin.your-domain.com/wp-json/wp/v2/service

# Verify REST API is enabled in WordPress
# WordPress Admin → Settings → Permalinks (save)
```

### SSL Certificate Issues
```bash
# Check certificate validity
openssl s_client -connect api.your-domain.com:443

# Renew certificate
sudo certbot renew --force-renewal
```

---

## Cost Estimate (Monthly)

| Component | Budget Option | Recommended |
|-----------|---|---|
| Frontend | Free (GitHub Pages) | $20 (Vercel Pro) |
| Backend | $3 (Railway Free) | $12 (Railway Standard) |
| WordPress | Free (WP.com) | $35 (Kinsta Starter) |
| Domain | $0.99-12 | $5-10 |
| **Total** | **~$11/month** | **~$60-70/month** |

---

## Deployment Checklist

- [ ] Backend code tested locally
- [ ] Frontend builds successfully
- [ ] Environment variables configured
- [ ] Database backups setup
- [ ] SSL certificates installed
- [ ] DNS records updated
- [ ] CORS configured correctly
- [ ] WordPress plugins installed
- [ ] Custom post types created
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] CDN configured (optional)

---

For questions or issues, refer to component-specific documentation or cloud provider docs.
