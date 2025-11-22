import { FilterBar } from '@/components/home/FilterBar';
import { MetasGrid } from '@/components/metas/MetasGrid';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function MetasPage() {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-slate-50 pt-4'>
        {/* Saudação + Filtros */}
        <FilterBar />

        {/* Grid de Metas */}
        <MetasGrid />

        {/* Footer (futuro) */}
      </div>
    </ProtectedRoute>
  );
}
