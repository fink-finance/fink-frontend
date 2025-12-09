import { DashboardCard } from '../shared/DashboardCard';
import { MortarboardFill, LockFill } from 'react-bootstrap-icons';

export const AcademyCard = () => {
  const soonBadge = (
    <span className='inline-flex items-center gap-2 px-5 py-[6px] rounded-full bg-primary text-white text-xs sm:text-sm font-normal'>
      <LockFill size={12} />
      Em breve
    </span>
  );

  return (
    <DashboardCard
      title='Academy'
      className='h-full bg-[#EEF2F3] border-[#E7EBEE]'
      subtitle='Trilhas de aprendizado que falam a sua língua'
      soon={soonBadge}
    >
      <div className='h-full flex flex-col items-center justify-center gap-4 pt-10'>
        <MortarboardFill size={100} color='#BECCFF' />
        <p className='text-center text-zinc-600 text-md'>
          Um novo jeito de aprender
          <br />e descomplicar finanças.
        </p>
      </div>
    </DashboardCard>
  );
};
