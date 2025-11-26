'use client';

import { useMetas } from '@/lib/hooks/metas';
import { DashboardCard } from '../shared/DashboardCard';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import { SpinLoader } from '../shared/SpinLoader';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MetasCard = () => {
  const { data: metas, isLoading, isError } = useMetas();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // ✅ useCallback garante que a função mantém a mesma referência
  const nextSlide = useCallback(() => {
    if (!metas || isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % metas.length);

    setTimeout(() => setIsAnimating(false), 500);
  }, [metas, isAnimating]);

  const prevSlide = useCallback(() => {
    if (!metas || isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + metas.length) % metas.length);

    setTimeout(() => setIsAnimating(false), 500);
  }, [metas, isAnimating]);

  // Auto-slide a cada 5 segundos
  useEffect(() => {
    if (!metas || metas.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [metas, nextSlide]); // ✅ Agora nextSlide é uma dependência estável

  return (
    <DashboardCard
      title='Metas'
      subtitle='O quão perto você está de realizar seus sonhos'
      className='h-full'
    >
      {isLoading && (
        <div className='flex justify-center items-center h-32'>
          <SpinLoader />
        </div>
      )}

      {isError && (
        <div className='flex justify-center items-center h-32'>
          <p className='text-destructive'>Erro ao carregar metas.</p>
        </div>
      )}

      {metas && metas.length > 0 && (
        <div className='relative pt-5'>
          {/* Container do carrossel */}
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {metas.map((meta) => {
                const progress =
                  (Number(meta.valor_atual) / Number(meta.valor_alvo)) * 100;

                return (
                  <div
                    key={meta.id_meta}
                    className='w-full flex-shrink-0 space-y-2'
                  >
                    <div className='flex justify-between pb-2'>
                      <span className='font-bold text-3xl'>
                        {toBRCurrency(Number(meta.valor_atual))}
                      </span>
                      <span className='text-md font-normal'>{meta.titulo}</span>
                    </div>
                    <div className='w-full bg-emptyCardBg rounded-full h-3'>
                      <div
                        className='bg-blue-600 h-full rounded-full transition-all'
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-base text-blue-600 font-medium'>
                        Você já economizou{' '}
                        <span className='font-bold'>
                          {toBRCurrency(Number(meta.valor_atual))}
                        </span>
                      </span>
                      <span className='text-gray-500'>
                        de {toBRCurrency(Number(meta.valor_alvo))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botões de navegação - só aparecem se tiver mais de 1 meta */}
          {metas.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-transparent shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors disabled:opacity-50'
                aria-label='Meta anterior'
              >
                <ChevronLeft className='w-5 h-5 text-gray-600' />
              </button>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-transparent shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors disabled:opacity-50'
                aria-label='Próxima meta'
              >
                <ChevronRight className='w-5 h-5 text-gray-600' />
              </button>

              {/* Indicadores de página */}
              <div className='flex justify-center gap-2 mt-4'>
                {metas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir para meta ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {metas && metas.length === 0 && (
        <div className='flex justify-center items-center h-32'>
          <p className='text-muted-foreground'>Nenhuma meta cadastrada.</p>
        </div>
      )}
    </DashboardCard>
  );
};
