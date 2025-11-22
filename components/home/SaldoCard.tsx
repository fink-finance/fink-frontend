import { DashboardCard } from '../shared/DashboardCard';

export const SaldoCard = () => {
  return (
    <DashboardCard
      title='Saldo do mês'
      className='h-full'
      subtitle='Seus gastos e ganhos até agora'
    >
      <div>{/* Área de conversa */}</div>
    </DashboardCard>
  );
};
