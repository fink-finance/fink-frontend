import { FilterBar } from '@/components/home/FilterBar';
import { CardsGrid } from '@/components/home/GridCards';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-slate-50 pt-4'>
      {/* Saudação + Filtros */}
      <FilterBar />

      {/* Grid de Cards */}
      <CardsGrid />

      {/* Footer (futuro) */}
    </div>
  );
}
