import Link from 'next/link';

export const Navbar = () => {
  return (
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
  );
};
