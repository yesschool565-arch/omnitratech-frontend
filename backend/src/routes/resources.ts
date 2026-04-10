import { Router } from 'express';
import { getResources, getResourceById } from '../controllers/resourcesController';

const router = Router();

// GET /api/resources - Get all resources
router.get('/', getResources);

// GET /api/resources/:id - Get single resource by ID
router.get('/:id', getResourceById);

export default router;
