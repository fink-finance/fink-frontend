'use client';

import { Button } from '@/components/ui/button';
import { FolderInput } from 'lucide-react';
import { getFormattedDate } from '@/lib/utils/get-formatted-date';
import { getGreetingByHour } from '@/lib/utils/get-greeting-by-hour';

export function FilterBar() {
  const date = new Date();
  const formattedDate = getFormattedDate(date);
  const greeting = getGreetingByHour(date.getHours());

  return (
    <div className='container mx-auto px-0 py-4'>
      <div className='flex items-center justify-between'>
        {/* Saudação */}
        <div>
          <p className='text-sm text-zinc-600'>{formattedDate}</p>
          <h1 className='text-2xl font-bold text-zinc-900'>
            {greeting}, Finker!
          </h1>
        </div>

        {/* Filtros e ações */}
        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm' radius='full'>
              Mês atual
            </Button>
            <Button variant='outline' size='sm' radius='full'>
              Último mês
            </Button>
            <Button variant='outline' size='sm' radius='full'>
              Última semana
            </Button>
            <Button variant='outline' size='sm' radius='full'>
              Último Ano
            </Button>
          </div>
          <div className='flex items-center'>
            <Button size='lg'>
              <FolderInput className='h-6 w-6' />
              Exportar dados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
