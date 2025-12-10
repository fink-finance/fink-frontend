'use client';

import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { FilterBarLayout } from '../shared/FilterBarLayout';
import { useState } from 'react';
import { AddMetaModal } from './AddMetaModal';

// Tipo para os filtros disponíveis
export type MetaFilterType = 'todas' | 'ativas' | 'inativas' | 'concluidas';

type MetaFilterBarProps = {
  activeFilter: MetaFilterType;
  onFilterChange: (filter: MetaFilterType) => void;
};

export function MetaFilterBar({
  activeFilter,
  onFilterChange,
}: MetaFilterBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters: { label: string; value: MetaFilterType }[] = [
    { label: 'Todas', value: 'todas' },
    { label: 'Ativas', value: 'ativas' },
    { label: 'Inativas', value: 'inativas' },
    { label: 'Concluídas', value: 'concluidas' },
  ];

  return (
    <FilterBarLayout title='Suas metas'>
      <>
        <div className='flex items-center gap-2'>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={'outline'}
              size='sm'
              radius='full'
              onClick={() => onFilterChange(filter.value)}
              className={
                filter.value === activeFilter
                  ? 'border-primary bg-[#EFF1FF] text-primary'
                  : ''
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>
        <div className='flex items-center'>
          <Button size='lg' onClick={() => setIsModalOpen(true)}>
            <CirclePlus />
            Criar nova meta
          </Button>
        </div>

        <AddMetaModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </>
    </FilterBarLayout>
  );
}
