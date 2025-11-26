'use client';

import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { FilterBarLayout } from '../shared/FilterBarLayout';
import { useState } from 'react';
import { AddMetaModal } from './AddMetaModal';

export function MetaFilterBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <FilterBarLayout title='Suas metas'>
      <>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' radius='full'>
            Todas
          </Button>
          <Button variant='outline' size='sm' radius='full'>
            Ativas
          </Button>
          <Button variant='outline' size='sm' radius='full'>
            Inativas
          </Button>
          <Button variant='outline' size='sm' radius='full'>
            Concluídas
          </Button>
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
