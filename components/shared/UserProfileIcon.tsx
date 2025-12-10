import Link from 'next/link';

export const UserProfileIcon = () => {
  return (
    <Link
      href='/profile'
      className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity'
    >
      <div className='h-12 w-12 rounded-full bg-zinc-200' />
    </Link>
  );
};
