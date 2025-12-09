import { DashboardCard } from '../shared/DashboardCard';
import PluggyButton from './PluggyButton';

export const ContasCard = () => {
  return (
    <DashboardCard
      title='Minhas contas'
      className='h-full'
      subtitle='Todas as suas contas em um só lugar'
    >
      <PluggyButton />

      <div>{/* Área de conversa */}</div>
    </DashboardCard>
  );
};
