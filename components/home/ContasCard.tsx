import PluggyButton from './PluggyButton';

export const ContasCard = () => {
  return (
    <div className='lg:col-span-5'>
      <div className='h-[280px] rounded-lg border bg-white p-6 shadow-sm'>
        <h2 className='text-lg font-semibold'>Minhas contas</h2>
        <PluggyButton />
        {/* TODO: Adicionar conteúdo */}
      </div>
    </div>
  );
};
