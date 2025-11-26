'use client';

import { useMetas } from '@/lib/hooks/metas';
import { MetaCard } from '../metas/MetaCard';
import { EmptyMetasCard } from './EmptyMetasCard';
import { SpinLoader } from '../shared/SpinLoader';

export const MetasGrid = () => {
  // ✅ Agora usa useMetas que busca do usuário autenticado via token
  const { data: metas, isLoading, isError } = useMetas();

  if (isLoading) {
    return (
      <div className='container flex justify-center items-center min-h-[400px]'>
        <SpinLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='container flex justify-center items-center h-full'>
        <p>Erro ao carregar metas.</p>
      </div>
    );
  }

  return (
    <div className='container pb-6'>
      <div className='grid grid-cols-1 gap-6 [grid-auto-rows:minmax(200px,300px)] lg:grid-cols-2'>
        {metas && metas.length > 0 ? (
          metas.map((meta) => <MetaCard key={meta.id_meta} meta={meta} />)
        ) : (
          <EmptyMetasCard />
        )}
      </div>
    </div>
  );
};
