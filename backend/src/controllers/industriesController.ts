import { Request, Response } from 'express';
import { db } from '../database/db';

export const getIndustries = async (req: Request, res: Response) => {
  const industries = db.getIndustries();
  res.json(industries);
};

export const getIndustryBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const industries = db.getIndustries();
  const industry = industries.find(i => i.slug === slug || i.id === slug);
  
  if (!industry) {
    return res.status(404).json({ error: 'Industry not found' });
  }
  
  res.json(industry);
};
