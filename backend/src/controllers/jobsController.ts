import { Request, Response } from 'express';
import { db } from '../database/db';

export const getJobs = async (req: Request, res: Response) => {
  const jobs = db.getJobs();
  res.json(jobs);
};

export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const jobs = db.getJobs();
  const job = jobs.find(j => j.id === id);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  
  res.json(job);
};
