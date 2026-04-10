import { Router, Response } from 'express';
import { db } from '../database/db';
import { adminAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Admin Login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const isValid = db.validateAdmin(username, password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create simple token (base64 encoded username)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    res.json({ token, message: 'Login successful' });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// Get all stats
router.get('/stats', adminAuth, (req: AuthRequest, res: Response) => {
  res.json({
    services: db.getServices().length,
    resources: db.getResources().length,
    jobs: db.getJobs().length,
    industries: db.getIndustries().length,
  });
});

// Services Management
router.get('/services', adminAuth, (req: AuthRequest, res: Response) => {
  res.json(db.getServices());
});

router.post('/services', adminAuth, (req: AuthRequest, res: Response) => {
  const service = db.addService(req.body);
  res.status(201).json(service);
});

router.put('/services/:id', adminAuth, (req: AuthRequest, res: Response) => {
  const service = db.updateService(req.params.id, req.body);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json(service);
});

router.delete('/services/:id', adminAuth, (req: AuthRequest, res: Response) => {
  db.deleteService(req.params.id);
  res.json({ message: 'Service deleted' });
});

// Resources Management
router.get('/resources', adminAuth, (req: AuthRequest, res: Response) => {
  res.json(db.getResources());
});

router.post('/resources', adminAuth, (req: AuthRequest, res: Response) => {
  const resource = db.addResource(req.body);
  res.status(201).json(resource);
});

router.put('/resources/:id', adminAuth, (req: AuthRequest, res: Response) => {
  const resource = db.updateResource(req.params.id, req.body);
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json(resource);
});

router.delete('/resources/:id', adminAuth, (req: AuthRequest, res: Response) => {
  db.deleteResource(req.params.id);
  res.json({ message: 'Resource deleted' });
});

// Jobs Management
router.get('/jobs', adminAuth, (req: AuthRequest, res: Response) => {
  res.json(db.getJobs());
});

router.post('/jobs', adminAuth, (req: AuthRequest, res: Response) => {
  const job = db.addJob(req.body);
  res.status(201).json(job);
});

router.put('/jobs/:id', adminAuth, (req: AuthRequest, res: Response) => {
  const job = db.updateJob(req.params.id, req.body);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

router.delete('/jobs/:id', adminAuth, (req: AuthRequest, res: Response) => {
  db.deleteJob(req.params.id);
  res.json({ message: 'Job deleted' });
});

// Industries Management
router.get('/industries', adminAuth, (req: AuthRequest, res: Response) => {
  res.json(db.getIndustries());
});

router.post('/industries', adminAuth, (req: AuthRequest, res: Response) => {
  const industry = db.addIndustry(req.body);
  res.status(201).json(industry);
});

router.put('/industries/:id', adminAuth, (req: AuthRequest, res: Response) => {
  const industry = db.updateIndustry(req.params.id, req.body);
  if (!industry) {
    return res.status(404).json({ error: 'Industry not found' });
  }
  res.json(industry);
});

router.delete('/industries/:id', adminAuth, (req: AuthRequest, res: Response) => {
  db.deleteIndustry(req.params.id);
  res.json({ message: 'Industry deleted' });
});

export default router;
