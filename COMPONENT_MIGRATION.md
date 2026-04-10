# Frontend Component Migration Guide

Step-by-step guide to update your React components to use the new backend API.

---

## 🎯 Overview

**Before**: Components use mock/static data  
**After**: Components fetch real data from backend API

### Benefits:
- ✅ Real data from WordPress
- ✅ Admin can update content in WordPress
- ✅ No redeployment needed for content changes
- ✅ Scalable and maintainable

---

## 📋 Component Migration Examples

### 1. Services Component Migration

**Current File**: `components/Services.tsx`

#### Before (Mock Data):
```typescript
import { useState } from 'react';
import ServiceCard from './ServiceCard';

export default function Services() {
  // Hard-coded mock data
  const [services] = useState([
    {
      id: '1',
      slug: 'web-development',
      title: 'Web Development',
      description: 'Custom web solutions...',
      iconName: 'Code',
      fullDescription: 'Full web development services...',
      benefits: ['Responsive Design', 'SEO Optimized'],
      features: [{ title: 'React', desc: 'Modern UI', iconName: 'Zap' }]
    },
    // ... more mock data
  ]);

  return (
    <div className="services">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

#### After (Backend API):
```typescript
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesAPI } from '../utils/apiClient';
import type { ServiceModel } from '../utils/apiClient';

export default function Services() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await servicesAPI.getAll();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load services:', err);
        setError('Failed to load services');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="text-center py-12">Loading services...</div>;
  if (error) return <div className="text-red-600 py-12">{error}</div>;
  if (services.length === 0) return <div className="py-12">No services found</div>;

  return (
    <div className="services">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

---

### 2. Service Detail Component Migration

**File**: `components/SolutionDetail.tsx` or similar

#### Before (Mock Data):
```typescript
import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';

export default function ServiceDetail() {
  const { slug } = useParams();

  // Mock data lookup
  const services = [
    {
      slug: 'web-development',
      title: 'Web Development',
      description: '...',
      // ... more data
    },
    // ... more services
  ];

  const service = useMemo(
    () => services.find(s => s.slug === slug),
    [slug]
  );

  if (!service) return <div>Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      {/* ... render service */}
    </div>
  );
}
```

#### After (Backend API):
```typescript
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { servicesAPI } from '../utils/apiClient';
import type { ServiceModel } from '../utils/apiClient';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<ServiceModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await servicesAPI.getBySlug(slug);
        setService(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load service:', err);
        setError('Service not found');
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-600 py-12">{error}</div>;
  if (!service) return <div className="py-12">Service not found</div>;

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      {/* Render fullDescription, benefits, features */}
      <div dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
      {/* ... render more data */}
    </div>
  );
}
```

---

### 3. Resources Component Migration

**File**: `components/Resources.tsx`

#### Before:
```typescript
const [resources] = useState([
  {
    id: '1',
    title: 'Getting Started',
    category: 'Guides',
    format: 'Article',
    date: '2024-01-15',
    readTime: '5 min'
  },
  // ... mock data
]);
```

#### After:
```typescript
import { useEffect, useState } from 'react';
import { resourcesAPI } from '../utils/apiClient';
import type { ResourceModel } from '../utils/apiClient';

export default function Resources() {
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resourcesAPI.getAll()
      .then(setResources)
      .catch(err => {
        console.error('Failed to load resources:', err);
        setResources([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
```

---

### 4. Jobs/Careers Component Migration

**File**: `components/Careers.tsx`

#### After:
```typescript
import { useEffect, useState } from 'react';
import { jobsAPI } from '../utils/apiClient';
import type { JobModel } from '../utils/apiClient';

export default function Careers() {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    jobsAPI.getAll()
      .then(data => {
        // Optional: Filter jobs
        const filtered = filter
          ? data.filter(j => 
              j.location.toLowerCase().includes(filter.toLowerCase()) ||
              j.department.toLowerCase().includes(filter.toLowerCase())
            )
          : data;
        setJobs(filtered);
      })
      .finally(() => setLoading(false));
  }, [filter]);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by location or department..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
```

---

### 5. Industries Component Migration

**File**: `components/Industries.tsx`

#### After:
```typescript
import { useEffect, useState } from 'react';
import { industriesAPI } from '../utils/apiClient';
import type { IndustryModel } from '../utils/apiClient';

export default function Industries() {
  const [industries, setIndustries] = useState<IndustryModel[]>([]);

  useEffect(() => {
    industriesAPI.getAll().then(setIndustries);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {industries.map(industry => (
        <IndustryCard key={industry.id} industry={industry} />
      ))}
    </div>
  );
}
```

---

## 🔄 Common Patterns

### Pattern 1: Simple List Fetch
```typescript
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  api.getMethod()
    .then(setItems)
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);
```

### Pattern 2: Fetch by ID/Slug
```typescript
const { id } = useParams();
const [item, setItem] = useState(null);

useEffect(() => {
  if (!id) return;
  api.getByIdMethod(id)
    .then(setItem)
    .catch(err => console.error(err));
}, [id]);
```

### Pattern 3: With Error Handling
```typescript
const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  api.getMethod()
    .then(res => {
      setData(res);
      setError(null);
    })
    .catch(err => {
      setError(err.message);
      setData(null);
    });
}, []);
```

---

## 🧪 Testing Your Changes

### 1. Component Still Same as Before?
- ✅ Yes! The UI should look identical
- ✅ Data now comes from backend instead of mock

### 2. Use React DevTools to Debug
1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Find your component
4. Check the state shows API data

### 3. Use Network Tab to Debug
1. Open DevTools → Network tab
2. Filter by XHR/Fetch
3. Watch API calls in real-time
4. Check response data

### 4. Test Error State
- Stop backend: `npm stop` in backend directory
- Component should show error message
- Restart backend: `npm run dev`

---

## 📋 Migration Checklist

For each component, check off:

- [ ] Import API client (`import { api } from '../utils/apiClient'`)
- [ ] Import types (`import type { Model } from '../utils/apiClient'`)
- [ ] Add `useState` for data, loading, error
- [ ] Add `useEffect` to fetch data
- [ ] Handle loading state (show spinner)
- [ ] Handle error state (show error message)
- [ ] Handle empty state (show "no data" message)
- [ ] Map over data to render components
- [ ] Remove mock data
- [ ] Test in browser
- [ ] Test error cases (stop backend, etc.)

---

## 🚀 Priority Order

Migrate components in this order:

1. **High Priority** (Core content):
   - Services
   - Industries
   - Jobs/Careers

2. **Medium Priority** (Secondary content):
   - Resources
   - Detail pages

3. **Low Priority** (Static/Info):
   - About
   - Footer
   - Home hero

---

## 🔗 Environment Variables

Make sure `.env` or `.env.local` is configured:

```env
VITE_API_URL=http://localhost:3000
```

The `apiClient.ts` will use this:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || '/api';
```

---

## 🐛 Common Issues & Solutions

### Issue: API returns 404
**Solution**: Ensure post type is created in WordPress with correct slug

### Issue: CORS error
**Solution**: Update `FRONTEND_URL` in backend `.env`

### Issue: Data not updating
**Solution**: 
1. Check content is published in WordPress
2. Refresh page (Ctrl+Shift+R to clear cache)
3. Check Network tab for failed requests

### Issue: Component shows "Loading..." forever
**Solution**:
1. Check backend is running
2. Check console for errors
3. Verify API URL is correct

---

## 📚 Reference

- [API Client Source](./utils/apiClient.ts)
- [Backend API Docs](./backend/README.md#api-endpoints)
- [React Hooks Guide](https://react.dev/reference/react/hooks)

---

## ✅ Done!

After migrating all components, your frontend will be fully connected to the WordPress backend. Content updates will be automatic!
