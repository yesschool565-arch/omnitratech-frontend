import { Request, Response } from 'express';
import { db } from '../database/db';

export const getResources = async (req: Request, res: Response) => {
  const resources = db.getResources();
  res.json(resources);
};

export const getResourceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resources = db.getResources();
  const resource = resources.find(r => r.id === id);
  
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  
  res.json(resource);
};
