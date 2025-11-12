'use client';

import Link from 'next/link';
import { MainLogo } from '@/components/shared/MainLogo';
import { UserProfileIcon } from './shared/UserProfileIcon';
import { Navbar } from './shared/Navbar';

export function Header() {
  return (
    <header className='w-full bg-zinc-50 pt-4'>
      <div className='container mx-auto flex h-16 items-center justify-between px-0'>
        {/* Logo */}
        <Link href='/home' aria-label='Fink Home'>
          <MainLogo />
        </Link>

        {/* Navegação principal */}
        <Navbar />

        {/* Avatar do usuário */}
        <UserProfileIcon />
      </div>
    </header>
  );
}
