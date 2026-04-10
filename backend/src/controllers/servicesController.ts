import { Request, Response } from 'express';
import { db } from '../database/db';

export const getServices = async (req: Request, res: Response) => {
  const services = db.getServices();
  res.json(services);
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const services = db.getServices();
  const service = services.find(s => s.slug === slug || s.id === slug);
  
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  
  res.json(service);
};
