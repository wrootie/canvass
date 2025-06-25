import { Request } from 'express';

// TODO: Merge with frontend types in a shared package
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface Record {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email?: string;
  notes: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface AuthRequest extends Request {
  params: Request['params'];
  user?: Omit<User, 'password'>;
  headers: Request['headers'] & {
    authorization?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

// Email is optional because don't want to make it a requirement to create a record with an email
export interface CreateRecordData {
  firstName: string;
  lastName: string;
  notes: string;
  email?: string;
}

// All fields are optional because don't want to make it a requirement to update all fields
export interface UpdateRecordData {
  firstName?: string;
  lastName?: string;  
  email?: string;
  notes?: string;
}
