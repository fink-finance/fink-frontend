import { HomeFilterBar } from '@/components/home/HomeFilterBar';
import { CardsGrid } from '@/components/home/GridCards';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-slate-50 pt-4'>
        {/* Saudação + Filtros */}
        <HomeFilterBar />

        {/* Grid de Cards */}
        <CardsGrid />

        {/* Footer (futuro) */}
      </div>
    </ProtectedRoute>
  );
}
