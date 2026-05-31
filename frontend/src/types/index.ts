export type Role = 'EMPLOYEE' | 'MANAGER' | 'CFO' | 'BOARD' | 'MATERIALS_MANAGER' | 'ADMIN';

export interface AuthUser {
  id: number;
  displayName: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
