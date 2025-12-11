'use client';

// ========================================
// IMPORTS
// ========================================
import { ModalDialog } from '@/components/shared/ModalDialog';
import { useAlertasNaoLidos, useMarkAlertaAsRead } from '@/lib/hooks/alertas';
import { Alerta } from '@/lib/api/types';
import { X, Infinity } from 'react-bootstrap-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Lightbulb,
  PiggyBank,
} from 'react-bootstrap-icons';
import { Button } from '@/components/ui/button';

// ========================================
// TIPOS
// ========================================
type AlertaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type AlertaGroup = {
  title: string;
  alertas: Alerta[];
};

type FilterType = 'todos' | 'hoje' | 'ultima-semana' | 'ultimo-mes';

// ========================================
// FUNÇÃO: Retorna ícone baseado no conteúdo do alerta
// ========================================
const getAlertaIcon = (conteudo: string) => {
  const content = conteudo.toLowerCase();

  // Ícone de saída (vermelho com seta para cima)
  if (content.includes('saída') || content.includes('saida')) {
    return (
      <div className='w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0'>
        <ArrowUp className='text-red-600' size={20} />
      </div>
    );
  }

  // Ícone de entrada (verde com seta para baixo)
  if (content.includes('entrada')) {
    return (
      <div className='w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0'>
        <ArrowDown className='text-green-600' size={20} />
      </div>
    );
  }

  // Ícone de meta (azul com cofrinho)
  if (content.includes('meta')) {
    return (
      <div className='w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0'>
        <PiggyBank className='text-blue-600' size={20} />
      </div>
    );
  }

  // Ícone padrão (azul com lâmpada)
  return (
    <div className='w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0'>
      <Lightbulb className='text-blue-600' size={20} />
    </div>
  );
};

// ========================================
// FUNÇÃO: Formata data para tempo relativo (ex: "30 mins atrás")
// ========================================
const getTimeAgo = (date: string) => {
  try {
    const timeAgo = formatDistanceToNow(new Date(date), {
      addSuffix: false,
      locale: ptBR,
    })
      .replace('cerca de ', '')
      .replace('minutos', 'mins')
      .replace('minuto', 'min')
      .replace(/(\d+)\s*horas?/g, '$1h')
      .replace('menos de um min', '< 1 min');

    return `${timeAgo} atrás`;
  } catch {
    return '';
  }
};

// ========================================
// COMPONENTE PRINCIPAL: Modal de Alertas
// ========================================
export const AlertaModal = ({ open, onOpenChange }: AlertaModalProps) => {
  // ========================================
  // HOOKS E ESTADO
  // ========================================
  const { data: alertas, isLoading } = useAlertasNaoLidos(); // Busca alertas não lidos da API
  const markAsRead = useMarkAlertaAsRead(); // Hook para marcar alerta como lido
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todos'); // Estado do filtro selecionado

  // ========================================
  // AGRUPAMENTO E FILTRAGEM DE ALERTAS
  // ========================================
  const groupedAlertas = useMemo(() => {
    if (!alertas) return [];

    // Calcula as datas de referência
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Cria os grupos de alertas
    const groups: AlertaGroup[] = [
      { title: 'Hoje', alertas: [] },
      { title: 'Última semana', alertas: [] },
      { title: 'Último mês', alertas: [] },
    ];

    // Distribui alertas nos grupos baseado na data
    alertas.forEach((alerta) => {
      const alertaDate = new Date(alerta.data);
      const alertaDay = new Date(
        alertaDate.getFullYear(),
        alertaDate.getMonth(),
        alertaDate.getDate()
      );

      if (alertaDay.getTime() === today.getTime()) {
        groups[0].alertas.push(alerta); // Alerta de hoje
      } else if (alertaDay >= lastWeek) {
        groups[1].alertas.push(alerta); // Alerta da última semana
      } else if (alertaDay >= lastMonth) {
        groups[2].alertas.push(alerta); // Alerta do último mês
      }
    });

    // Aplica filtro baseado na seleção do usuário
    if (selectedFilter === 'hoje') {
      return groups.filter(
        (group) => group.title === 'Hoje' && group.alertas.length > 0
      );
    } else if (selectedFilter === 'ultima-semana') {
      return groups.filter(
        (group) => group.title === 'Última semana' && group.alertas.length > 0
      );
    } else if (selectedFilter === 'ultimo-mes') {
      return groups.filter(
        (group) => group.title === 'Último mês' && group.alertas.length > 0
      );
    }

    // Para "todos", retorna apenas grupos que têm alertas
    return groups.filter((group) => group.alertas.length > 0);
  }, [alertas, selectedFilter]);

  // ========================================
  // FUNÇÃO: Marca alerta como lido
  // ========================================
  const handleMarkAsRead = (id: number) => {
    markAsRead.mutate({ id, lida: true });
  };

  // ========================================
  // RENDERIZAÇÃO DO MODAL
  // ========================================
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Notificações'
      className='w-[95vw] h-full max-h-[80vh] overflow-y-auto'
    >
      {/* ========================================
          BARRA DE FILTROS
          ======================================== */}
      <div className='flex gap-3 mb-6'>
        {/* Botão: Todas */}
        <Button
          onClick={() => setSelectedFilter('todos')}
          variant='outline'
          radius='full'
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'todos'
              ? 'border-primary bg-[#EFF1FF] text-primary'
              : 'bg-white text-black border-[#D1D2D9] hover:border-primary hover:bg-[#EFF1FF] hover:text-primary'
          }`}
        >
          <Infinity size={16} />
          <span className='text-sm font-medium'>Todas</span>
        </Button>

        {/* Botão: Hoje */}
        <Button
          onClick={() => setSelectedFilter('hoje')}
          variant='outline'
          radius='full'
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'hoje'
              ? 'border-primary bg-[#EFF1FF] text-primary'
              : 'bg-white text-black border-[#D1D2D9] hover:border-primary hover:bg-[#EFF1FF] hover:text-primary'
          }`}
        >
          <span className='text-sm font-medium'>Hoje</span>
        </Button>

        {/* Botão: Última semana */}
        <Button
          onClick={() => setSelectedFilter('ultima-semana')}
          variant='outline'
          radius='full'
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'ultima-semana'
              ? 'border-primary bg-[#EFF1FF] text-primary'
              : 'bg-white text-black border-[#D1D2D9] hover:border-primary hover:bg-[#EFF1FF] hover:text-primary'
          }`}
        >
          <span className='text-sm font-medium'>Última semana</span>
        </Button>

        {/* Botão: Último mês */}
        <Button
          onClick={() => setSelectedFilter('ultimo-mes')}
          variant='outline'
          radius='full'
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'ultimo-mes'
              ? 'border-primary bg-[#EFF1FF] text-primary'
              : 'bg-white text-black border-[#D1D2D9] hover:border-primary hover:bg-[#EFF1FF] hover:text-primary'
          }`}
        >
          <span className='text-sm font-medium'>Último mês</span>
        </Button>
      </div>

      {/* ========================================
          CONTEÚDO PRINCIPAL
          ======================================== */}

      {isLoading ? (
        /* Estado: Carregando */
        <div className='flex items-center justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      ) : !alertas || alertas.length === 0 ? (
        /* Estado: Sem alertas no total */
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Lightbulb size={32} className='text-gray-400' />
          </div>
          <p className='text-gray-500 text-lg'>
            Nenhuma notificação no momento
          </p>
          <p className='text-gray-400 text-sm mt-2'>
            Você está em dia com suas notificações!
          </p>
        </div>
      ) : groupedAlertas.length === 0 ? (
        /* Estado: Sem alertas no período filtrado */
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Lightbulb size={32} className='text-gray-400' />
          </div>
          <p className='text-gray-500 text-lg'>
            Nenhuma notificação neste período
          </p>
        </div>
      ) : (
        /* Estado: Renderizar alertas agrupados */
        <div className='space-y-4'>
          {groupedAlertas.map((group) => (
            <div key={group.title}>
              {/* Etiqueta do grupo (Hoje, Última semana, etc) */}
              <div className='border-b-2 border-b-[#EEF2F3]'>
                <h3
                  className='text-lg font-semibold text-white px-6 py-2 inline-block bg-primary'
                  style={{
                    borderRadius: '0 24px 0 0',
                  }}
                >
                  {group.title}
                </h3>
              </div>

              {/* Lista de alertas do grupo */}
              <div>
                {group.alertas.map((alerta, index) => (
                  <div
                    key={alerta.id_alerta}
                    className={`flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors group ${
                      index < group.alertas.length - 1
                        ? 'border-b-2 border-b-[#EEF2F3]'
                        : ''
                    }`}
                    style={{
                      borderColor:
                        index < group.alertas.length - 1
                          ? '#EEF2F3' // Borda entre alertas
                          : 'transparent',
                    }}
                  >
                    {/* Ícone do alerta */}
                    {getAlertaIcon(alerta.conteudo)}

                    {/* Conteúdo do alerta */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1'>
                          {/* Título do alerta (primeira frase) */}
                          <p className='text-sm font-medium text-gray-900 break-words'>
                            {alerta.conteudo.split('.')[0]}
                          </p>

                          {/* Descrição do alerta (demais frases) */}
                          {alerta.conteudo.includes('.') && (
                            <p className='text-sm text-gray-600 mt-1 break-words'>
                              {alerta.conteudo
                                .split('.')
                                .slice(1)
                                .join('.')
                                .trim()}
                            </p>
                          )}
                        </div>

                        {/* Tempo relativo (ex: "30 mins atrás") */}
                        <span className='text-xs text-gray-500 whitespace-nowrap'>
                          {getTimeAgo(alerta.data)}
                        </span>
                      </div>
                    </div>

                    {/* Botão de marcar como lida (aparece no hover) */}
                    <button
                      onClick={() => handleMarkAsRead(alerta.id_alerta)}
                      className='text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100'
                      disabled={markAsRead.isPending}
                      aria-label='Marcar como lida'
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalDialog>
  );
};
