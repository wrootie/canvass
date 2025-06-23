
export interface CanvassingRecord {
  id: string;
  name: string;
  email: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
