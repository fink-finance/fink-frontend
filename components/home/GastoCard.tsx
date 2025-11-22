import { DashboardCard } from '../shared/DashboardCard';

export const GastoCard = () => {
  return (
    <DashboardCard
      title='Meus gastos'
      className='h-full'
      subtitle='Para onde vai o seu dinheiro'
    >
      <div>{/* Área de conversa */}</div>
    </DashboardCard>
  );
};
