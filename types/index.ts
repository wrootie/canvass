// Shared types for the frontend and backend

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
