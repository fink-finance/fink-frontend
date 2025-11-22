import { MetasCard } from './MetasCard';
import { GastoCard } from './GastoCard';
import { SaldoCard } from './SaldoCard';
import { ContasCard } from './ContasCard';
import { InvestimentosCard } from './InvestimentosCard';
import { ChatAICard } from './ChatAICard';

export const CardsGrid = () => {
  return (
    <>
      {/* Grid de Cards */}
      <div className='container pb-6'>
        <div className='grid grid-cols-1 gap-6 [grid-auto-rows:minmax(300px,400px)] md:grid-cols-2 lg:grid-rows-4 lg:grid-cols-3 lg:h-[950px]'>
          <div className='md:col-span-1 md:row-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2'>
            <SaldoCard />
          </div>

          <div className='md:col-span-1 md:row-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2'>
            <GastoCard />
          </div>

          <div className='md:col-span-1 md:row-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-1'>
            <MetasCard />
          </div>

          <div className='md:col-span-1 md:row-span-1 lg:col-start-1 lg:row-start-3 lg:row-span-2'>
            <ContasCard />
          </div>

          <div className='md:col-span-1 md:row-span-1 lg:col-start-2 lg:row-start-3 lg:row-span-2'>
            <InvestimentosCard />
          </div>

          <div className='md:col-span-1 md:row-span-1 lg:col-start-3 lg:row-start-2 lg:row-span-3'>
            <ChatAICard />
          </div>
        </div>
      </div>
    </>
  );
};
