import { Router } from 'express';
import { getJobs, getJobById } from '../controllers/jobsController';

const router = Router();

// GET /api/jobs - Get all jobs
router.get('/', getJobs);

// GET /api/jobs/:id - Get single job by ID
router.get('/:id', getJobById);

export default router;
