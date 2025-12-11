'use client';

import { useMetas } from '@/lib/hooks/metas';
import { MetaStatus } from '@/lib/api/types/meta';
import { DashboardCard } from '../shared/DashboardCard';
import { SpinLoader } from '../shared/SpinLoader';
import { MetaCard } from '../metas/MetaCard';

export const MetasCard = () => {
  const { data: metas, isLoading, isError } = useMetas();

  const filteredMetas = metas?.filter(
    (meta) =>
      meta.status === MetaStatus.EM_ANDAMENTO ||
      meta.status === MetaStatus.ATRASADA
  );

  return (
    <DashboardCard
      title="Minhas metas"
      subtitle="O quão perto você está de realizar seus sonhos"
      className="h-full"
      hasArrow
      arrowHref="/metas"
    >
      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <SpinLoader />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-32">
          <p className="text-destructive">Erro ao carregar metas.</p>
        </div>
      )}

      {filteredMetas && filteredMetas.length > 0 && (
        <div className="flex flex-col gap-4 overflow-auto min-h-0 pt-4">
          {filteredMetas.map((meta) => (
            <MetaCard
              key={meta.id_meta}
              meta={meta}
              className="h-full border border-[#E7EBEE] shadow-none"
              dashboard={true}
            />
          ))}
        </div>
      )}

      {filteredMetas && filteredMetas.length === 0 && (
        <div className="flex justify-center items-center h-32">
          <p className="text-muted-foreground">Nenhuma meta cadastrada.</p>
        </div>
      )}
    </DashboardCard>
  );
};
