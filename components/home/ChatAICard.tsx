import { DashboardCard } from '../shared/DashboardCard';

export const ChatAICard = () => {
  return (
    <DashboardCard
      title='Chat Finker'
      className='h-full'
      subtitle='Tire suas dúvidas aqui! Pergunte o que quiser!'
    >
      <div>{/* Área de conversa */}</div>
    </DashboardCard>
  );
};
