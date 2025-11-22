import { Plus } from 'lucide-react';

interface AddMetaButtonProps {
  onClick: () => void;
}

export const AddMetaButton = ({ onClick }: AddMetaButtonProps) => {
  return (
    <button
      className='flex items-center justify-center w-14 h-14 border-2 border-dashed border-l-accent border-r-primary border-y-secondary rounded-full hover:bg-primary/10 transition-colors'
      aria-label='Adicionar nova meta'
      onClick={onClick}
    >
      <Plus className='w-10 h-10 text-primary ' />
    </button>
  );
};
