'use client';

import Link from 'next/link';
import { MainLogo } from '@/components/shared/MainLogo';

export function Header() {
  return (
    <header className='w-full bg-zinc-50 pt-4'>
      <div className='container mx-auto flex h-16 items-center justify-between px-0'>
        {/* Logo */}
        <Link href='/home' aria-label='Fink Home'>
          <MainLogo />
        </Link>

        {/* Navegação principal */}
        <nav className='hidden md:flex items-center gap-6'>
          <Link
            href='/home/contas'
            className='text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors border-b-2 border-b-gray-600'
          >
            Minhas contas
          </Link>
          <Link
            href='/home/gastos'
            className='text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors'
          >
            Meus gastos
          </Link>
          <Link
            href='/home'
            className='text-sm font-medium text-primary hover:text-primary/80 transition-colors'
          >
            Espaço Finker
          </Link>
          <Link
            href='/home/investimentos'
            className='text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors'
          >
            Investimentos
          </Link>
          <Link
            href='/home/metas'
            className='text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors'
          >
            Metas
          </Link>
        </nav>

        {/* Avatar do usuário */}
        <div className='flex items-center gap-3'>
          <div className='h-9 w-9 rounded-full bg-zinc-200' />
        </div>
      </div>
    </header>
  );
}
