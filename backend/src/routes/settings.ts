import { Router, Response } from 'express';
import { db } from '../database/db';
import { adminAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Public - Get settings
router.get('/', (req, res) => {
  try {
    const settings = db.getSettings();
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Update settings
router.put('/', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
