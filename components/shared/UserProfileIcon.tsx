import { useCurrentPessoa } from '@/lib/hooks/pessoas';

export const UserProfileIcon = () => {
  const { data: pessoa, isLoading } = useCurrentPessoa();

  return (
    <div className='flex items-center gap-3'>
      <div className='h-12 w-12 rounded-full bg-zinc-300 text-center flex items-center justify-center'>
        <span className='text-xl font-medium'>
          {pessoa?.nome?.charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  );
};
