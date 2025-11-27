import { Meta } from '@/lib/api/types';
import { Card } from '../ui/card';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import { Calendar, Plane } from 'lucide-react';

type MetaCardProps = {
  meta: Meta;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
};

// // Mapeamento de categorias para ícones
// const CATEGORIA_ICONS: Record<string, string> = {
//   Emergência: '/images/metas/emergencia.png',
//   Investimento: '/images/metas/investimento.png',
//   Viagem: '/images/metas/viagem.png',
//   Educação: '/images/metas/educacao.png',
//   Dívidas: '/images/metas/dividas.png',
//   Moradia: '/images/metas/moradia.png',
//   Veículo: '/images/metas/veiculo.png',
//   Intercâmbio: '/images/metas/intercambio.png',
//   Segurança: '/images/metas/seguranca.png',
//   Saúde: '/images/metas/saude.png',
//   Outros: '/images/metas/outros.png',
// };

// Cores de status
const STATUS_COLORS: Record<string, string[]> = {
  em_andamento: ['border-accent', 'bg-accent'],
  concluida: ['border-primary', 'bg-primary'],
  cancelada: ['border-muted', 'bg-muted'],
  atrasada: ['border-destructive', 'bg-destructive'],
};

const STATUS_LABELS: Record<string, string> = {
  em_andamento: 'Ativa',
  concluida: 'Concluída',
  cancelada: 'Inativa',
  atrasada: 'Atrasada',
};

export const MetaCard = ({
  meta,
  interactive = false,
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
    `${interactive ? 'group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer' : ''} ${className}`.trim();

  return (
    <>
      <Card className={cardClasses} onClick={interactive ? onClick : undefined}>
        {/* Top div */}
        <div className='p-6 md:pt-10 space-y-4'>
          {/* Status badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border-2 ${STATUS_COLORS[meta.status][0]}`}
          >
            <div
              className={`w-3 h-3 ${STATUS_COLORS[meta.status][1]} rounded-full`}
            />
            <span className='text-sm font-medium'>
              {STATUS_LABELS[meta.status]}
            </span>
          </div>

          {/* Title */}
          <h2 className='text-xl sm:text-3xl font-bold'>{meta.titulo}</h2>

          {/* Category and Date */}
          <div className='flex items-center gap-3'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full'>
              <Plane className='w-4 h-4' />
              <span className='font-medium'>{meta.categoria}</span>
            </div>

            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300'>
              <Calendar className='w-4 h-4' />
              <span className='font-medium'>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Bottom div */}
        <div className='p-6 space-y-2'>
          <div className='flex items-center justify-between text-base'>
            <span className='font-medium'>
              Você economizou{' '}
              <span className='text-2xl font-bold text-foreground'>
                {formattedActualValue}
              </span>
            </span>
            <span className='text-muted-foreground'>
              de {formattedTargetValue}
            </span>
          </div>

          {/* Progress Bar */}
          <div className='relative w-full h-[10px] bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300'
              style={{ width: `${progressInPercent}%` }}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
