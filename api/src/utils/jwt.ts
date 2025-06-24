import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// TODO: TEST!

/**
 * Generate a JWT token
 * @param userId - The user ID to include in the token
 * @returns The generated token
 */
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN as any });
};

/**
 * Verify a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded token
 */
export const verifyToken = (token: string): { userId: number } => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
};