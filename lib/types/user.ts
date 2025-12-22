export type UserRole = 'branch_officer' | 'operations' | 'ops_head' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  branch?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

