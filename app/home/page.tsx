import { FilterBar } from '@/components/home/FilterBar';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-slate-50 pt-4'>
      {/* Saudação + Filtros */}
      <FilterBar />

      {/* Grid de Cards */}
      <div className='container mx-auto px-0 pb-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Linha 1: Saldo do mês + Meus gastos + Metas */}
          <div className='lg:col-span-4'>
            <div className='h-[350px] rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold'>Saldo do mês</h2>
              {/* TODO: Adicionar conteúdo */}
            </div>
          </div>

          <div className='lg:col-span-4'>
            <div className='h-[350px] rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold'>Meus gastos</h2>
              {/* TODO: Adicionar conteúdo */}
            </div>
          </div>

          <div className='lg:col-span-4'>
            <div className='h-[350px] rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold'>Metas</h2>
              {/* TODO: Adicionar conteúdo */}
            </div>
          </div>

          {/* Linha 2: Minhas contas + Investimentos */}
          <div className='lg:col-span-5'>
            <div className='h-[280px] rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold'>Minhas contas</h2>
              {/* TODO: Adicionar conteúdo */}
            </div>
          </div>

          <div className='lg:col-span-7'>
            <div className='h-[280px] rounded-lg border bg-white p-6 shadow-sm'>
              <h2 className='text-lg font-semibold'>Investimentos</h2>
              {/* TODO: Adicionar conteúdo */}
            </div>
          </div>
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
    </div>
  );
}
