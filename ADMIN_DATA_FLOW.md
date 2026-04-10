# 📋 Admin Panel Data Structure & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Web Frontend   │         │   Admin Panel    │         │
│  │  (React/Vite)   │         │   (Built-in)     │         │
│  │ Port: 5173      │         │ Port: 3001       │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                           │                    │
│           └───────────────┬───────────┘                     │
│                           │                                │
└─────────────────────────────────────────────────────────────┘
                           │
                    HTTP/REST API
                (Authenticated/Public)
                           │
┌─────────────────────────────────────────────────────────────┐
│                    SERVER LAYER                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│          ┌──────────────────────────────┐                  │
│          │    Express.js Backend        │                  │
│          │    Port: 3001                │                  │
│          └──────────┬───────────────────┘                  │
│                     │                                     │
│   ┌─────────────────┼─────────────────┐                  │
│   │                 │                 │                  │
│   ▼                 ▼                 ▼                  │
│ ┌────────┐  ┌─────────────┐  ┌──────────────┐          │
│ │ Routes │  │ Middleware  │  │ Controllers  │          │
│ │        │  │  (Auth)     │  │              │          │
│ └────────┘  └─────────────┘  └──────────────┘          │
│   │                       │                  │           │
│   └───────────────────────┼──────────────────┘           │
│                           │                              │
│                    ┌──────▼──────┐                       │
│                    │  Database   │                       │
│                    │  Service    │                       │
│                    └──────┬──────┘                       │
│                           │                              │
└─────────────────────────────────────────────────────────┘
                           │
                    File System
                           │
               ┌───────────▼─────────────┐
               │  /backend/data/         │
               │  database.json          │
               │  (Persistent Storage)   │
               └─────────────────────────┘
```

## Data Flow Diagrams

### Adding New Service

```
Admin Panel UI
      │
      ▼
[Form Input]
  - Name
  - Description
  - Icon
  - Features
      │
      ▼
[Validation]
      │
      ▼
POST /api/admin/services
(with Bearer Token)
      │
      ▼
[Authentication Check]
      │
      ▼
[Database Service]
  - Generate ID
  - Add timestamp
  - Save to JSON
      │
      ▼
[Response]
{
  id: "123456",
  name: "Service Name",
  description: "...",
  icon: "...",
  features: "...",
  createdAt: "2026-04-09T..."
}
      │
      ▼
[Frontend Update]
  - Refresh list
  - Show success message
  - Clear form
```

### Displaying Data to Users

```
Frontend Component
      │
      ▼
GET /api/services
(No authentication needed)
      │
      ▼
Backend Route Handler
      │
      ▼
Database Service
  - Read from JSON
  - Parse data
  - Return array
      │
      ▼
API Response
[
  {
    id: "123",
    name: "Service 1",
    description: "...",
    ...
  },
  ...
]
      │
      ▼
Frontend Renders
  - Display services
  - Map components
  - Show details
```

### Admin Authentication Flow

```
Admin Login Page
      │
      ▼
[Enter Credentials]
  - Username: admin
  - Password: admin123
      │
      ▼
POST /api/admin/login
      │
      ▼
[Validate Credentials]
  - Compare with database
  - Check user exists
      │
      ▼
[Generate Token]
  - Encode username
  - Add timestamp
  - Return token
      │
      ▼
[Store in Browser]
  - localStorage.setItem('adminToken', token)
      │
      ▼
[Access Admin Panel]
  - Use token in Authorization header
  - For all admin requests
```

## Data Models

### Service
```json
{
  "id": "1712707800000",
  "name": "Cloud Solutions",
  "description": "Enterprise cloud infrastructure",
  "icon": "☁️",
  "features": "Scalability, Security, Performance",
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T11:00:00Z"
}
```

### Resource
```json
{
  "id": "1712707800001",
  "title": "Cloud Architecture Guide",
  "description": "Complete guide to cloud architecture",
  "category": "Tutorial",
  "url": "https://example.com/guide",
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T11:00:00Z"
}
```

### Job
```json
{
  "id": "1712707800002",
  "title": "Senior DevOps Engineer",
  "department": "Engineering",
  "location": "New York, NY",
  "description": "Looking for experienced DevOps engineer...",
  "requirements": "5+ years, Docker, Kubernetes",
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T11:00:00Z"
}
```

### Industry
```json
{
  "id": "1712707800003",
  "name": "Healthcare",
  "description": "Digital solutions for healthcare",
  "image": "https://example.com/healthcare.jpg",
  "expertise": "HIPAA, Patient Management, Analytics",
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T11:00:00Z"
}
```

## API Request/Response Examples

### Creating a Service

**Request:**
```bash
POST /api/admin/services
Authorization: Bearer eyJhZGm1pbm5zd...
Content-Type: application/json

{
  "name": "AI Solutions",
  "description": "Machine learning and AI services",
  "icon": "🤖",
  "features": "ML Models, NLP, Computer Vision"
}
```

**Response:**
```json
{
  "id": "1712707800000",
  "name": "AI Solutions",
  "description": "Machine learning and AI services",
  "icon": "🤖",
  "features": "ML Models, NLP, Computer Vision",
  "createdAt": "2026-04-09T12:30:00Z"
}
```

### Fetching Services (Public)

**Request:**
```bash
GET /api/services
```

**Response:**
```json
[
  {
    "id": "1712707800000",
    "name": "AI Solutions",
    "description": "Machine learning and AI services",
    "icon": "🤖",
    "features": "ML Models, NLP, Computer Vision",
    "createdAt": "2026-04-09T12:30:00Z"
  },
  ...
]
```

### Updating a Service

**Request:**
```bash
PUT /api/admin/services/1712707800000
Authorization: Bearer eyJhZG1pbm5zd...
Content-Type: application/json

{
  "name": "AI & ML Solutions",
  "description": "Advanced machine learning services"
}
```

**Response:**
```json
{
  "id": "1712707800000",
  "name": "AI & ML Solutions",
  "description": "Advanced machine learning services",
  "icon": "🤖",
  "features": "ML Models, NLP, Computer Vision",
  "createdAt": "2026-04-09T12:30:00Z",
  "updatedAt": "2026-04-09T14:00:00Z"
}
```

### Deleting a Service

**Request:**
```bash
DELETE /api/admin/services/1712707800000
Authorization: Bearer eyJhZG1pbm5zd...
```

**Response:**
```json
{
  "message": "Service deleted"
}
```

## Database File Structure

File location: `/backend/data/database.json`

```json
{
  "services": [
    { "id": "...", "name": "...", ... }
  ],
  "resources": [
    { "id": "...", "title": "...", ... }
  ],
  "jobs": [
    { "id": "...", "title": "...", ... }
  ],
  "industries": [
    { "id": "...", "name": "...", ... }
  ],
  "adminUsers": [
    {
      "id": "1",
      "username": "admin",
      "password": "admin123",
      "email": "admin@omnitratech.com",
      "createdAt": "2026-04-09T10:00:00Z"
    }
  ]
}
```

## State Management

### Admin Panel State

```javascript
{
  authToken: string,           // Stored in localStorage
  currentType: 'service'|'resource'|'job'|'industry',
  editingId: string|null,      // When editing an item
  stats: {                       // Dashboard statistics
    services: number,
    resources: number,
    jobs: number,
    industries: number
  },
  items: any[],                // Current tab items
  errors: string[],            // Error messages
  loading: boolean             // API call state
}
```

## Error Handling

```
API Error (4xx/5xx)
      │
      ├─► 400: Invalid request data
      ├─► 401: Authentication failed
      ├─► 404: Item not found
      ├─► 500: Server error
      │
      ▼
Error Message
      │
      ▼
Display to User
      │
      ▼
Auto-hide after 3 seconds
```

## Security Implementation

1. **Authentication**
   - Simple token based (Base64 encoded)
   - Stored in browser localStorage
   - Sent in Authorization header

2. **CORS**
   - Restricted to frontend URL
   - Only specified methods allowed
   - Custom headers allowed

3. **Data Validation**
   - Required fields checked
   - Type validation
   - Length limits

4. **Data Persistence**
   - JSON file-based storage
   - Auto-saved after each change
   - Versioning via timestamps
