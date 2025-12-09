import { Button } from '@/components/ui/button';
import { getFormattedDate } from '@/lib/utils/get-formatted-date';
import { getGreetingByHour } from '@/lib/utils/get-greeting-by-hour';
import { FilterBarLayout } from '../shared/FilterBarLayout';

export function HomeFilterBar() {
  const date = new Date();
  const greeting = `${getGreetingByHour(date.getHours())}, Finker!`;
  return (
    <FilterBarLayout title={greeting}>
      <>
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
          <Button size='lg'>Exportar dados</Button>
        </div>
      </>
    </FilterBarLayout>
  );
}
