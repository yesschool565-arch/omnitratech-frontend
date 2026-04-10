import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    username: string;
  };
}

export function adminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No authorization token' });
  }

  try {
    // Simple token validation - in production use JWT
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [username] = decoded.split(':');
    req.user = { username };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
