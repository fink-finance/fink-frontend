import React from 'react';
import { Meta } from '@/lib/api/types';
import { MetaStatus, MetaCategoria } from '@/lib/api/types/meta';
import { Card } from '../ui/card';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import {
  HandbagFill,
  AirplaneFill,
  ExclamationDiamondFill,
  TagFill,
  Calendar,
} from 'react-bootstrap-icons';
import { cn } from '@/lib/utils';

type MetaCardProps = {
  meta: Meta;
  interactive?: boolean;
  dashboard?: boolean;
  onClick?: () => void;
  className?: string;
};

// Mapeamento de categorias para ícones
export const CATEGORIA_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  [MetaCategoria.VIAGEM]: AirplaneFill,
  [MetaCategoria.COMPRAS]: HandbagFill,
  [MetaCategoria.EMERGENCIA]: ExclamationDiamondFill,
  [MetaCategoria.OUTROS]: TagFill,
};

// Cores de status
const STATUS_COLORS: Record<
  MetaStatus,
  {
    border: string;
    background?: string;
    useGradientBorder?: boolean;
  }
> = {
  [MetaStatus.EM_ANDAMENTO]: {
    border: 'border-accent',
    background: 'bg-accent',
  },
  [MetaStatus.CONCLUIDA]: {
    border: 'border-primary',
    background: 'bg-gradient-to-r from-[#6ADCC5] to-[#0055FF]',
    useGradientBorder: true,
  },
  [MetaStatus.CANCELADA]: {
    border: 'border-[#D1D2D9]',
    background: 'bg-[#D1D2D9]',
  },
  [MetaStatus.ATRASADA]: {
    border: 'border-destructive',
    background: 'bg-destructive',
  },
};

const STATUS_LABELS: Record<MetaStatus, string> = {
  [MetaStatus.EM_ANDAMENTO]: 'Ativa',
  [MetaStatus.CONCLUIDA]: 'Concluída',
  [MetaStatus.CANCELADA]: 'Inativa',
  [MetaStatus.ATRASADA]: 'Atrasada',
};

export const CATEGORY_COLORS: Record<MetaCategoria, string> = {
  [MetaCategoria.VIAGEM]: 'bg-[#EBFDFD] text-[#0C9F93]',
  [MetaCategoria.COMPRAS]: 'bg-blue-200 text-primary',
  [MetaCategoria.EMERGENCIA]: 'bg-[#FCF3F3] text-[#C31017]',
  [MetaCategoria.OUTROS]: 'bg-blue-200 text-primary',
};

// Cores de fundo e texto separadas para facilitar reutilização
export const CATEGORY_BG_COLORS: Record<MetaCategoria, string> = {
  [MetaCategoria.VIAGEM]: 'bg-[#EBFDFD]',
  [MetaCategoria.COMPRAS]: 'bg-blue-200',
  [MetaCategoria.EMERGENCIA]: 'bg-[#FCF3F3]',
  [MetaCategoria.OUTROS]: 'bg-blue-200',
};

export const CATEGORY_TEXT_COLORS: Record<MetaCategoria, string> = {
  [MetaCategoria.VIAGEM]: 'text-[#EBFDFD]',
  [MetaCategoria.COMPRAS]: 'text-blue-200',
  [MetaCategoria.EMERGENCIA]: 'text-[#FCF3F3]',
  [MetaCategoria.OUTROS]: 'text-blue-200',
};

const PROGRESS_BAR_COLORS: Record<MetaStatus, string> = {
  [MetaStatus.EM_ANDAMENTO]: 'bg-black',
  [MetaStatus.CONCLUIDA]: 'bg-gradient-to-r from-[#6ADCC5] to-[#0055FF]',
  [MetaStatus.CANCELADA]: 'bg-[#D1D2D9]',
  [MetaStatus.ATRASADA]: 'bg-black',
};

export const MetaCard = ({
  meta,
  interactive = false,
  dashboard = false,
  onClick,
  className = '',
}: MetaCardProps) => {
  const formattedActualValue = toBRCurrency(Number(meta.valor_atual), false);
  const formattedTargetValue = toBRCurrency(Number(meta.valor_alvo));

  const progressInPercent = Math.min(
    (Number(meta.valor_atual) / Number(meta.valor_alvo)) * 100,
    100
  ).toFixed(0);

  // Formatar data
  const formattedDate = new Date(meta.termina_em).toLocaleDateString('pt-BR');

  // Classes condicionais baseadas na prop interactive
  const cardClasses =
    `${interactive ? 'group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer' : ''} ${className} 
    ${(meta.status === MetaStatus.CANCELADA || meta.status === MetaStatus.CONCLUIDA) && interactive ? 'bg-[#EEF2F3]' : ''}`.trim();

  const CategoryIcon =
    CATEGORIA_ICONS[meta.categoria] || CATEGORIA_ICONS[MetaCategoria.OUTROS];

  // Determinar cor do ícone baseado no status
  const iconColorClass =
    meta.status === MetaStatus.CANCELADA
      ? 'text-[#D1D2D9]'
      : CATEGORY_TEXT_COLORS[meta.categoria as MetaCategoria] ||
        CATEGORY_TEXT_COLORS[MetaCategoria.OUTROS];

  return (
    <>
      <Card
        className={cn('relative overflow-hidden', cardClasses)}
        style={{ borderColor: '#E7EBEE' }}
        onClick={interactive ? onClick : undefined}
      >
        {/* Ícone da categoria no canto superior direito */}
        <div
          className={cn(
            'absolute top-[-20px] right-[-20px] pointer-events-none',
            meta.categoria === MetaCategoria.VIAGEM ? 'opacity-100' : ''
          )}
        >
          <CategoryIcon
            className={cn(
              dashboard
                ? 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'
                : 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40',
              meta.categoria === MetaCategoria.VIAGEM && '-rotate-45',
              iconColorClass
            )}
          />
        </div>

        <div
          className={cn(
            'p-6 space-y-4 relative z-10',
            dashboard ? 'pt-2 md:pt-4' : 'md:pt-10'
          )}
        >
          {/* Top div */}
          {!dashboard && (
            <>
              {/* Status badge */}
              {STATUS_COLORS[meta.status].useGradientBorder ? (
                <div className='inline-flex items-center gap-2 px-[2px] py-[2px] rounded-full bg-gradient-to-r from-[#6ADCC5] to-[#0055FF]'>
                  <div className='inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border-2 border-transparent'>
                    <div
                      className={`w-3 h-3 ${STATUS_COLORS[meta.status].background || ''} rounded-full`}
                    />
                    <span className='text-sm font-medium'>
                      {STATUS_LABELS[meta.status]}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 ${STATUS_COLORS[meta.status].border} bg-white`}
                >
                  <div
                    className={`w-3 h-3 ${STATUS_COLORS[meta.status].background || ''} rounded-full`}
                  />
                  <span className='text-sm font-medium'>
                    {STATUS_LABELS[meta.status]}
                  </span>
                </div>
              )}
            </>
          )}

          {/* Title */}
          <h2
            className={cn(
              dashboard ? 'text-xl font-bold' : 'sm:text-3xl text-xl font-bold',
              meta.status === MetaStatus.CANCELADA && interactive
                ? 'text-[#D1D2D9]'
                : ''
            )}
          >
            {meta.titulo}
          </h2>

          {/* Category and Date */}
          <div className='flex items-center gap-3'>
            <div
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1 rounded-full',
                (meta.status === MetaStatus.CANCELADA ||
                  meta.status === MetaStatus.CONCLUIDA) &&
                  interactive
                  ? 'bg-[#D1D2D9] text-black'
                  : CATEGORY_COLORS[meta.categoria as MetaCategoria]
              )}
            >
              {(() => {
                const IconComponent =
                  CATEGORIA_ICONS[meta.categoria] ||
                  CATEGORIA_ICONS[MetaCategoria.OUTROS];
                return <IconComponent className='w-4 h-4' />;
              })()}
              <span
                className={cn(
                  'font-normal',
                  (meta.status === MetaStatus.CANCELADA ||
                    meta.status === MetaStatus.CONCLUIDA) &&
                    interactive
                    ? 'text-black'
                    : CATEGORY_COLORS[meta.categoria as MetaCategoria]
                )}
              >
                {meta.categoria}
              </span>
            </div>

            <div
              className={cn(
                'hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border',
                (meta.status === MetaStatus.CANCELADA ||
                  meta.status === MetaStatus.CONCLUIDA) &&
                  interactive
                  ? 'bg-[#D1D2D9] text-black'
                  : ''
              )}
            >
              <Calendar className='w-4 h-4' />
              <span
                className={cn(
                  'font-normal',
                  (meta.status === MetaStatus.CANCELADA ||
                    meta.status === MetaStatus.CONCLUIDA) &&
                    interactive
                    ? 'text-black'
                    : ''
                )}
              >
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom div */}
        <div className={cn('p-6 space-y-2', dashboard ? 'pt-0' : '')}>
          <div className='flex items-center justify-between text-base'>
            <span
              className={cn(
                'font-medium',
                meta.status === MetaStatus.CANCELADA && interactive
                  ? 'text-[#808088]'
                  : ''
              )}
            >
              {dashboard ? '' : 'Você economizou'}{' '}
              <span className='text-2xl font-semibold'>
                {formattedActualValue}
              </span>
            </span>
            <span className='text-[#808088] font-normal'>
              de {formattedTargetValue}
            </span>
          </div>

          {/* Progress Bar */}
          <div className='relative w-full h-[10px] bg-gray-200 rounded-full overflow-hidden'>
            <div
              className={cn(
                'absolute top-0 left-0 h-full rounded-full transition-all duration-300',
                interactive ? PROGRESS_BAR_COLORS[meta.status] : 'bg-black'
              )}
              style={{ width: `${progressInPercent}%` }}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
