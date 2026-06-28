import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { getItem, setItem, removeItem } from '@/utils/storage';

const AUTH_KEY = '@kaayos/auth-user';

export type UserRole = 'homeowner' | 'provider' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: NonNullable<UserRole>;
  avatar?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem(AUTH_KEY).then((stored) => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch {}
      }
    }).finally(() => setIsLoading(false));
  }, []);

  const persistUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      setItem(AUTH_KEY, JSON.stringify(u));
    } else {
      removeItem(AUTH_KEY);
    }
  }, []);

  const login = useCallback(async (_email: string, _password: string) => {
    const u: User = {
      id: '1',
      name: 'Juan Dela Cruz',
      email: _email,
      role: 'homeowner',
      avatar: undefined,
    };
    persistUser(u);
  }, [persistUser]);

  const register = useCallback(async (_name: string, _email: string, _password: string, role: UserRole) => {
    const u: User = {
      id: '2',
      name: _name,
      email: _email,
      role: role ?? 'homeowner',
      avatar: undefined,
    };
    persistUser(u);
  }, [persistUser]);

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
