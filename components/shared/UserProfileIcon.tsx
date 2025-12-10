import { useCurrentPessoa } from '@/lib/hooks/pessoas';
import Link from 'next/link';

export const UserProfileIcon = () => {
  const { data: pessoa } = useCurrentPessoa();

  return (
    <Link
      href='/profile'
      className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
    >
      <div
        className='h-12 w-12 rounded-full bg-primary flex items-center 
      justify-center text-xl font-semibold text-primary-foreground overflow-hidden'
      >
        <span>{pessoa?.nome.charAt(0)}</span>
      </div>
    </Link>
  );
};
