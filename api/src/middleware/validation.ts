import { Request, Response, NextFunction } from 'express';
import { LoginCredentials, RegisterCredentials, CreateRecordData, UpdateRecordData } from '../types';

//TODO: TEST! Beef up password validation!

/**
 * Validate an email address
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password
 * @param password - The password to validate
 * @returns True if the password is valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate a login request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password }: LoginCredentials = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  next();
};

/**
 * Validate a register request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password }: LoginCredentials = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({ error: 'Password must be at least 6 characters' });
    return;
  }

  next();
};

/**
 * Validate a create record request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const validateCreateRecord = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { firstName, lastName, email, notes }: CreateRecordData = req.body;

  if (!firstName || !lastName || !notes) {
    res.status(400).json({ error: 'Some required fields are missing' });
    return;
  }

  if (email && !validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (firstName.length < 2 || lastName.length < 2) {
    res.status(400).json({ error: 'First and last name must be at least 2 characters' });
    return;
  }

  if (notes.length > 255) {
    res.status(400).json({ error: 'Notes must be 255 characters or less' });
    return;
  }

  next();
};

/**
 * Validate an update record request
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const validateUpdateRecord = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { firstName, lastName, email, notes }: UpdateRecordData = req.body;

  if (!firstName && !lastName && !email && !notes) {
    res.status(400).json({ error: 'At least one field (firstName, lastName, email, or notes) must be provided' });
    return;
  }

  if (firstName && firstName.length < 2) {
    res.status(400).json({ error: 'First name must be at least 2 characters' });
    return;
  }

  if (lastName && lastName.length < 2) {
    res.status(400).json({ error: 'Last name must be at least 2 characters' });
    return;
  }

  if (email && !validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  if (notes && notes.length > 255) {
    res.status(400).json({ error: 'Notes must be 255 characters or less' });
    return;
  }

  next();
};

/**
 * Validate a record ID
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const validateRecordId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const recordId = parseInt(id);

  if (isNaN(recordId) || recordId <= 0) {
    res.status(400).json({ error: 'Invalid record ID' });
    return;
  }

  next();
};