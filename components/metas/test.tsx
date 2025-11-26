'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Meta } from '@/lib/api/types/meta';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import Image from 'next/image';

// Função auxiliar para formatar data
const formatarData = (dataISO: string): string => {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR');
};

interface MetaCardProps {
  meta: Meta;
}

// Mapeamento de categorias para ícones
const CATEGORIA_ICONS: Record<string, string> = {
  Emergência: '/images/metas/emergencia.png',
  Investimento: '/images/metas/investimento.png',
  Viagem: '/images/metas/viagem.png',
  Educação: '/images/metas/educacao.png',
  Dívidas: '/images/metas/dividas.png',
  Moradia: '/images/metas/moradia.png',
  Veículo: '/images/metas/veiculo.png',
  Intercâmbio: '/images/metas/intercambio.png',
  Segurança: '/images/metas/seguranca.png',
  Saúde: '/images/metas/saude.png',
  Outros: '/images/metas/outros.png',
};

// Cores de status
const STATUS_COLORS: Record<string, string> = {
  em_andamento: 'bg-green-500',
  concluida: 'bg-blue-500',
  cancelada: 'bg-red-500',
};

const STATUS_LABELS: Record<string, string> = {
  em_andamento: 'Ativa',
  concluida: 'Concluída',
  cancelada: 'Cancelada',
};

export const MetaCard = ({ meta }: MetaCardProps) => {
  const progresso = (meta.valor_atual / meta.valor_alvo) * 100;
  const progressoFormatado = Math.min(progresso, 100).toFixed(0);

  // Formatar data
  const dataFormatada = formatarData(meta.termina_em);

  // Ícone da categoria
  const iconePath =
    CATEGORIA_ICONS[meta.categoria] || CATEGORIA_ICONS['Outros'];

  return (
    <Card className='relative overflow-hidden hover:shadow-lg transition-shadow'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div>
            {/* Badge de status */}
            {/* <div className='flex items-center gap-2 mb-2'>
              <div
                className={`w-2 h-2 rounded-full ${STATUS_COLORS[meta.status] || 'bg-gray-500'}`}
              />
              <span className='text-xs font-medium text-muted-foreground'>
                {STATUS_LABELS[meta.status] || meta.status}
              </span>
            </div> */}

            {/* Título */}
            <h3 className='text-xl font-bold text-foreground'>{meta.titulo}</h3>

            {/* Categoria e Data */}
            <div className='flex items-center gap-3 mt-2 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <span className='text-primary font-medium'>
                  {meta.categoria}
                </span>
              </div>
              <span>📅 {dataFormatada}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Valores */}
        <div className='space-y-1'>
          <div className='flex items-baseline justify-between'>
            <p className='text-sm text-muted-foreground'>Você economizou</p>
            <p className='text-sm text-muted-foreground'>
              de {toBRCurrency(meta.valor_alvo)}
            </p>
          </div>
          <p className='text-2xl font-bold text-foreground'>
            {toBRCurrency(meta.valor_atual)}
          </p>
        </div>

        {/* Barra de progresso */}
        <div className='space-y-2'>
          <div className='w-full bg-muted rounded-full h-2.5'>
            <div
              className='bg-foreground h-2.5 rounded-full transition-all duration-300'
              style={{ width: `${progressoFormatado}%` }}
            />
          </div>
        </div>

        {/* Ícone da categoria no canto inferior direito */}
        <div className='absolute bottom-4 right-4 opacity-20'>
          <div className='relative w-24 h-24'>
            <Image
              src={iconePath}
              alt={meta.categoria}
              fill
              className='object-contain'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
