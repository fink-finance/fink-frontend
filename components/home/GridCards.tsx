import { MetasCard } from './MetasCard';
import { ContasCard } from './ContasCard';
import { GastosCard } from './GastosCard';
import { AcademyCard } from './Academy';
import { MovCard } from './Mov';

export const CardsGrid = () => {
  return (
    <>
      {/* Grid de Cards */}
      <div className='container pb-6'>
        <div className='grid grid-cols-1 gap-6 [grid-auto-rows:minmax(300px,auto)] md:grid-cols-2 md:[grid-auto-rows:auto] lg:grid-rows-10 lg:grid-cols-3 lg:h-[950px] lg:[grid-auto-rows:1fr]'>
          <div className='md:col-start-1 md:row-start-1 md:row-span-3 lg:col-start-1 lg:row-start-1 lg:row-span-10'>
            <MovCard />
          </div>
          <div className='md:col-start-2 md:row-start-1 md:row-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-5'>
            <ContasCard />
          </div>
          <div className='md:col-start-2 md:row-start-2 md:row-span-2 lg:col-start-3 lg:row-start-1 lg:row-span-6'>
            <MetasCard />
          </div>

          <div className='md:col-start-2 md:row-start-4 md:row-span-1 lg:col-start-2 lg:row-start-6 lg:row-span-5'>
            <GastosCard />
          </div>

          <div className='md:col-start-1 md:row-start-4 md:row-span-1 lg:col-start-3 lg:row-start-7 lg:row-span-4'>
            <AcademyCard />
          </div>
        </div>
      </div>
    </>
  );
};
