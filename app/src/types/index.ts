
export interface CanvassingRecord {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
