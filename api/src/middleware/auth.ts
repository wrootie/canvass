import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserModel } from '../models/User';
import { AuthRequest } from '../types';

/**
 * Authenticate a token
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]?.replace(/"/g, ''); // Bearer TOKEN - strip quotes
    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const { userId } = verifyToken(token);
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};