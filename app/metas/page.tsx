'use client';

import { useState } from 'react';
import { MetasGrid } from '@/components/metas/MetasGrid';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import {
  MetaFilterBar,
  MetaFilterType,
} from '@/components/metas/MetaFilterBar';

export default function MetasPage() {
  const [activeFilter, setActiveFilter] = useState<MetaFilterType>('todas');

  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-slate-50 pt-4'>
        {/* Saudação + Filtros */}
        <MetaFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Grid de Metas */}
        <MetasGrid activeFilter={activeFilter} />

        {/* Footer (futuro) */}
      </div>
    </ProtectedRoute>
  );
}
