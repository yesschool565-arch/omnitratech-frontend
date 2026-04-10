# Omnitratech Admin Dashboard

Admin panel for managing all site content without WordPress.

## Features

✨ **Complete Data Management**
- Services management
- Resources management
- Jobs/Careers management
- Industries management

🔐 **Secure Admin Panel**
- Simple authentication
- Token-based access
- Real-time data updates

📊 **Dashboard Statistics**
- Quick overview of all content
- Item counts
- Organized by category

🎨 **User-Friendly Interface**
- Intuitive UI
- Modal forms for adding/editing
- Confirmation before deletion
- Success/error notifications

## Quick Access

- **Admin Panel:** http://localhost:3001/admin
- **API Base:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`

⚠️ Change these in production!

## Data Structure

### Services
```typescript
{
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string;
  createdAt: string;
  updatedAt?: string;
}
```

### Resources
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  createdAt: string;
  updatedAt?: string;
}
```

### Jobs
```typescript
{
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  createdAt: string;
  updatedAt?: string;
}
```

### Industries
```typescript
{
  id: string;
  name: string;
  description: string;
  image: string;
  expertise: string;
  createdAt: string;
  updatedAt?: string;
}
```

## Database

Data is stored in JSON format at: `./backend/data/database.json`

This is automatically created on first run with a default admin user.

## API Documentation

See `ADMIN_PANEL_SETUP.md` for complete API documentation.

## Security Notes

1. Change default admin credentials immediately
2. Use HTTPS in production
3. Implement proper JWT tokens (currently using simple auth)
4. Add database backups
5. Implement rate limiting
6. Add audit logs
