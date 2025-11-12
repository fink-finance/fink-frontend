import { MetasCard } from './MetasCard';
import { GastoCard } from './GastoCard';
import { SaldoCard } from './SaldoCard';
import { ContasCard } from './ContasCard';
import { InvestimentosCard } from './InvestimentosCard';

export const CardsGrid = () => {
  return (
    <>
      {/* Grid de Cards */}
      <div className='container pb-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          <SaldoCard />

          <GastoCard />

          <MetasCard />

          <ContasCard />

          <InvestimentosCard />
        </div>
      </div>

      {/* Chat Finker - Fixed no canto inferior direito */}
      <div className='fixed bottom-6 right-6'>
        <div className='w-80 rounded-lg border bg-white p-4 shadow-lg'>
          <h3 className='font-semibold'>Chat Finker</h3>
          <p className='text-sm text-zinc-600'>Tire suas dúvidas aqui!</p>
          {/* TODO: Adicionar chat */}
        </div>
      </div>
    </>
  );
};
