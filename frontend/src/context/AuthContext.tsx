import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { AuthUser } from '../types';
import { getMe, login as apiLogin } from '../api/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rfp_token');
    if (!token) { setIsLoading(false); return; }

    getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('rfp_token'))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(username: string, password: string) {
    const { token, user } = await apiLogin(username, password);
    localStorage.setItem('rfp_token', token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('rfp_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
