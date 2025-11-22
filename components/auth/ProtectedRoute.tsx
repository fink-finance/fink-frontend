'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/sessoes';
import { SpinLoader } from '../shared/SpinLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Só renderiza após montar no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, isLoading, router]);

  // ✅ Durante SSR ou carregamento inicial
  if (!isMounted || isLoading) {
    return (
      <div className='container min-h-screen flex items-center justify-center'>
        <SpinLoader />
      </div>
    );
  }

  // ✅ Após carregar, se não autenticado
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
