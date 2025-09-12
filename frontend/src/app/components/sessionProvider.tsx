'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession } from '@/app/actions/getToken';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role?: string;
  isAdmin: boolean;
}

interface SessionContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchSession = async () => {
    try {
      const { user: userData } = await getSession();
      
      setUser(userData);
    } catch (error) {
      console.error('SessionProvider - erro ao buscar sessão:', error);
    }
  };

  const refreshSession = async () => {
    await fetchSession();
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser, refreshSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used within SessionProvider');
  return context;
}
