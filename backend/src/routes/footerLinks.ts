import { Router, Response } from 'express';
import { db } from '../database/db';
import { adminAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Public - Get all footer links
router.get('/', (req, res) => {
  try {
    const links = db.getFooterLinks();
    res.json(links);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Add footer link
router.post('/', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    const link = db.addFooterLink(req.body);
    res.status(201).json(link);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Update footer link
router.put('/:id', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    const link = db.updateFooterLink(req.params.id, req.body);
    if (!link) {
      return res.status(404).json({ error: 'Footer link not found' });
    }
    res.json(link);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin - Delete footer link
router.delete('/:id', adminAuth, (req: AuthRequest, res: Response) => {
  try {
    db.deleteFooterLink(req.params.id);
    res.json({ message: 'Footer link deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
