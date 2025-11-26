import { MetasGrid } from '@/components/metas/MetasGrid';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MetaFilterBar } from '@/components/metas/MetaFilterBar';

export default function MetasPage() {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-slate-50 pt-4'>
        {/* Saudação + Filtros */}
        <MetaFilterBar />

        {/* Grid de Metas */}
        <MetasGrid />

        {/* Footer (futuro) */}
      </div>
    </ProtectedRoute>
  );
}
