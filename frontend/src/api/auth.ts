import client from './client';
import type { AuthUser, LoginResponse } from '../types';

export async function login(username: string, password: string): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>('/auth/login', { username, password });
  return data;
}

export async function getMe(): Promise<AuthUser> {
  const { data } = await client.get<{ user: AuthUser }>('/auth/me');
  return data.user;
}
