# Frontend Repository Files Template

## Copy this to: frontend/.gitignore

```
node_modules/
npm-debug.log*
dist/
.env.local
.DS_Store
.vscode/
.idea/
*.log
.env*.local
.cache/
.parcel-cache/
.turbo/
```

---

## Copy this to: frontend/README.md

```markdown
# OmnitraTech Frontend

Modern React 19 frontend application built with Vite for OmnitraTech platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm 8+

### Development
```bash
npm install
npm run dev
```

Access at: `http://localhost:5175`

### Production Build
```bash
npm install
npm run build
npm run preview
```

## 📋 Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:3001/api
GEMINI_API_KEY=your_api_key_here (optional)
```

For production, set `VITE_API_URL` to your deployed backend URL.

See `.env.example` for all available options.

## 📦 Technology Stack

- **React** 19.2.4 - UI Library
- **Vite** 6.2.0 - Build tool
- **TypeScript** - Type safety
- **React Router** 7.13.0 - Navigation
- **Lucide React** - Icons

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Industries.tsx
│   ├── Resources.tsx
│   ├── Careers.tsx
│   ├── Contact.tsx
│   ├── AdminDashboard.tsx
│   └── NavBar.tsx
├── utils/            # Utility functions
│   └── api.ts        # API client
└── App.tsx           # Main app component
```

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero section |
| Services | `/#services` | Technology solutions |
| Industries | `/#industries` | Vertical industry solutions |
| Resources | `/resources` | Documentation & guides |
| Careers | `/careers` | Job listings |
| Contact | `/#contact` | Contact form |
| Admin | `/admin` | Admin dashboard |

## 🐳 Docker

### Build
```bash
docker build -t omnitratech-frontend . --target frontend
```

### Run Development
```bash
docker run -p 5175:5175 \
  -e VITE_API_URL=http://localhost:3001/api \
  omnitratech-frontend
```

### Run Production
```bash
docker build -t omnitratech-frontend . --target production
docker run -p 5175:5175 omnitratech-frontend
```

## 📡 API Integration

Frontend communicates with backend API at `VITE_API_URL`

### Key Endpoints
- `GET /services` - Fetch services
- `GET /industries` - Fetch industries
- `GET /jobs` - Fetch jobs
- `GET /resources` - Fetch resources
- `POST /admin/login` - Admin login
- `POST /form-entries` - Submit contact form
- `GET /settings` - Site configuration

## 🚀 Deployment

### Vercel
1. Import repository from GitHub
2. Set `VITE_API_URL` environment variable
3. Deploy (automatic on push)

See `vercel.json` for configuration.

### Local Testing
```bash
npm run build
npm run preview
```

## 🎨 Features

✅ Responsive design  
✅ Admin dashboard  
✅ Contact form  
✅ Job listings  
✅ Service showcase  
✅ Industry solutions  
✅ Resources section  
✅ Dark mode ready  
✅ Performance optimized  
✅ SEO friendly  

## 📝 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔗 Backend Repository

- Frontend: https://github.com/your-username/omnitratech-frontend
- Backend: https://github.com/your-username/omnitratech-backend

## 📝 License
MIT
```

---

## Copy this to: frontend/package.json

Make sure these scripts are in your `package.json`:

```json
{
  "name": "omnitratech-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx"
  },
  "dependencies": {
    "lucide-react": "^0.563.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^5.0.0",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.54.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```
