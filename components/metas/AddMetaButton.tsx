import { Plus } from 'lucide-react';

interface AddMetaButtonProps {
  onClick?: () => void;
  asChild?: boolean;
}

export const AddMetaButton = ({
  onClick,
  asChild = false,
}: AddMetaButtonProps) => {
  const className =
    'flex items-center justify-center w-14 h-14 border-2 border-dashed border-l-accent border-r-primary border-y-secondary rounded-full hover:bg-primary/10 transition-colors';

  // Se for usado como filho de outro elemento clicável (como DashboardCard), usa div
  if (asChild) {
    return (
      <div className={className} aria-label='Adicionar nova meta'>
        <Plus className='w-10 h-10 text-primary' />
      </div>
    );
  }

  return (
    <button
      className={className}
      aria-label='Adicionar nova meta'
      onClick={onClick}
    >
      <Plus className='w-10 h-10 text-primary' />
    </button>
  );
};
