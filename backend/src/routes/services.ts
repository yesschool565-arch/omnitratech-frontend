import { Router } from 'express';
import { getServices, getServiceBySlug } from '../controllers/servicesController';

const router = Router();

// GET /api/services - Get all services
router.get('/', getServices);

// GET /api/services/:slug - Get single service by slug
router.get('/:slug', getServiceBySlug);

export default router;
