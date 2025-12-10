'use client';

import { useState, useMemo } from 'react';
import { useMetas } from '@/lib/hooks/metas';
import { MetaCard } from '../metas/MetaCard';
import { EmptyMetasCard } from './EmptyMetasCard';
import { SpinLoader } from '../shared/SpinLoader';
import { MetaDetailModal } from './MetaDetailModal';
import { Meta } from '@/lib/api/types';
import { MetaStatus } from '@/lib/api/types/meta';
import { MetaFilterType } from './MetaFilterBar';

type MetasGridProps = {
  activeFilter: MetaFilterType;
};

export const MetasGrid = ({ activeFilter }: MetasGridProps) => {
  // ✅ Agora usa useMetas que busca do usuário autenticado via token
  const { data: metas, isLoading, isError } = useMetas();
  const [selectedMeta, setSelectedMeta] = useState<Meta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar e ordenar metas por prioridade de status
  const filteredAndSortedMetas = useMemo(() => {
    if (!metas) return [];

    // Primeiro, filtra baseado no filtro ativo
    let filtered = metas;

    switch (activeFilter) {
      case 'ativas':
        // Ativas = em_andamento + atrasadas
        filtered = metas.filter(
          (meta) =>
            meta.status === MetaStatus.EM_ANDAMENTO ||
            meta.status === MetaStatus.ATRASADA
        );
        break;
      case 'inativas':
        filtered = metas.filter((meta) => meta.status === MetaStatus.CANCELADA);
        break;
      case 'concluidas':
        filtered = metas.filter((meta) => meta.status === MetaStatus.CONCLUIDA);
        break;
      case 'todas':
      default:
        filtered = metas;
        break;
    }

    // Depois, ordena por prioridade de status e por data
    const statusPriority: Record<MetaStatus, number> = {
      [MetaStatus.ATRASADA]: 1,
      [MetaStatus.EM_ANDAMENTO]: 2,
      [MetaStatus.CONCLUIDA]: 3,
      [MetaStatus.CANCELADA]: 4,
    };

    return [...filtered].sort((a, b) => {
      const priorityA = statusPriority[a.status as MetaStatus] || 999;
      const priorityB = statusPriority[b.status as MetaStatus] || 999;

      // Primeiro ordena por prioridade de status
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // Depois ordena por data (metas mais próximas primeiro)
      const dateA = new Date(a.termina_em).getTime();
      const dateB = new Date(b.termina_em).getTime();
      return dateA - dateB;
    });
  }, [metas, activeFilter]);

  const handleMetaClick = (meta: Meta) => {
    setSelectedMeta(meta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeta(null);
  };

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
    <>
      <div className='container pb-6'>
        <div className='grid grid-cols-1 gap-6 [grid-auto-rows:minmax(200px,300px)] lg:grid-cols-2'>
          {filteredAndSortedMetas && filteredAndSortedMetas.length > 0 ? (
            filteredAndSortedMetas.map((meta) => (
              <MetaCard
                key={meta.id_meta}
                meta={meta}
                interactive={true}
                onClick={() => handleMetaClick(meta)}
              />
            ))
          ) : (
            <EmptyMetasCard />
          )}
        </div>
      </div>

      {/* Modal de detalhamento */}
      <MetaDetailModal
        meta={selectedMeta}
        open={isModalOpen}
        onOpenChange={handleCloseModal}
      />
    </>
  );
};
