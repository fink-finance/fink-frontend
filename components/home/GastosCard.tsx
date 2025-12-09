import { redirect } from 'next/navigation';
import { DashboardCard } from '../shared/DashboardCard';

export const GastosCard = () => {
  return (
    <DashboardCard
      title='Meus gastos e ganhos'
      className='h-full'
      subtitle='Para onde vai o seu dinheiro'
      // onClick={() => {
      //   redirect('/gastos');
      // }}
    >
      <div>{/* Área de conversa */}</div>
    </DashboardCard>
  );
};
