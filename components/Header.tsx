'use client';

import Link from 'next/link';
import { MainLogo } from '@/components/shared/MainLogo';
import { UserProfileIcon } from './shared/UserProfileIcon';
import { Navbar } from './shared/Navbar';
import { useState } from 'react';
import { Bell, BellFill } from 'react-bootstrap-icons';
import { AlertaModal } from './alertas/AlertaModal';
import { useAlertasNaoLidos } from '@/lib/hooks/alertas';

export function Header() {
  const [isAlertaModal, setIsAlertaModal] = useState(false);
  const { data: alertas } = useAlertasNaoLidos();
  const unreadCount = alertas?.length || 0;

  return (
    <>
      <header className='w-full bg-zinc-50 pt-4'>
        <div className='container flex h-16 items-center justify-between'>
          {/* Logo */}

          <Link href='/home' aria-label='Fink Home'>
            <MainLogo />
          </Link>

          {/* Navegação principal */}
          <Navbar />

          {/* Avatar do usuário */}
          <div className='flex items-center gap-4'>
            <button
              className='relative h-12 w-12 rounded-full border border-[#D1D2D9] flex items-center justify-center hover:bg-gray-100 transition-colors'
              onClick={() => setIsAlertaModal(true)}
              aria-label='Notificações'
            >
              {unreadCount > 0 ? (
                <BellFill size={20} className='text-blue-600' />
              ) : (
                <Bell size={20} />
              )}
              {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <UserProfileIcon />
          </div>
        </div>
      </header>

      <AlertaModal open={isAlertaModal} onOpenChange={setIsAlertaModal} />
    </>
  );
}
