import { Router } from 'express';
import { getIndustries, getIndustryBySlug } from '../controllers/industriesController';

const router = Router();

// GET /api/industries - Get all industries
router.get('/', getIndustries);

// GET /api/industries/:slug - Get single industry by slug
router.get('/:slug', getIndustryBySlug);

export default router;
