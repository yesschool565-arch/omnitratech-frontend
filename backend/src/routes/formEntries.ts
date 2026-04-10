import { Router, Response } from 'express';
import { db } from '../database/db';
import { adminAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Public - Submit form entry
router.post('/', (req, res) => {
  try {
    const entry = db.addFormEntry(req.body);
    res.status(201).json(entry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Get all form entries
router.get('/', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    const entries = db.getFormEntries();
    res.json(entries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Delete specific form entry
router.delete('/:id', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    db.deleteFormEntry(req.params.id);
    res.json({ message: 'Form entry deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Clear all form entries
router.delete('/', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    db.clearFormEntries();
    res.json({ message: 'All form entries cleared' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
