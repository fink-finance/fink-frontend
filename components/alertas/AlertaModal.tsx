'use client';

// ========================================
// IMPORTS
// ========================================
import { ModalDialog } from '@/components/shared/ModalDialog';
import { useAlertasNaoLidos, useMarkAlertaAsRead } from '@/lib/hooks/alertas';
import { Alerta } from '@/lib/api/types';
import {
  X,
  Infinity,
  ArrowUpCircle,
  ArrowDownCircle,
  Bell,
  Suitcase2,
} from 'react-bootstrap-icons';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

type AlertaType = 'meta' | 'entrada' | 'saida';

// ========================================
// FUNÇÃO: Detecta tipo do alerta
// ========================================
const getAlertaType = (conteudo: string): AlertaType => {
  const content = conteudo.toLowerCase();
  if (content.includes('retirou') || content.includes('saida')) return 'saida';
  if (content.includes('adicionou')) return 'entrada';
  return 'meta';
};

// ========================================
// FUNÇÃO: Retorna título formatado do alerta
// ========================================
const getAlertaTitle = (type: AlertaType): string => {
  switch (type) {
    case 'saida':
      return 'Saída registrada';
    case 'entrada':
      return 'Entrada registrada';
    case 'meta':
      return 'Nova meta criada';
  }
};

// ========================================
// FUNÇÃO: Retorna ícone baseado no tipo do alerta
// ========================================
const getAlertaIcon = (type: AlertaType) => {
  switch (type) {
    case 'saida':
      return (
        <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0'>
          <ArrowUpCircle className='text-[#EC1312]' size={22} />
        </div>
      );
    case 'entrada':
      return (
        <div className='w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0'>
          <ArrowDownCircle className='text-[#2D9E20]' size={22} />
        </div>
      );
    case 'meta':
      return (
        <div
          className='w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-[2px]'
          style={{
            background: 'linear-gradient(135deg, #6ADCC5, #0055FF)',
            padding: '2px',
          }}
        >
          <div className='w-full h-full rounded-full flex items-center justify-center'>
            <Suitcase2 className='text-white' size={22} />
          </div>
        </div>
      );
  }
};

// ========================================
// FUNÇÃO: Formata o conteúdo com cores para valores monetários
// ========================================
const formatConteudoWithColors = (conteudo: string, type: AlertaType) => {
  // Regex para encontrar valores monetários (R$ X,XX ou R$ X.XXX,XX)
  const valorRegex = /(R\$\s?[\d.,]+)/g;

  const parts = conteudo.split(valorRegex);

  return parts.map((part, index) => {
    if (valorRegex.test(part)) {
      const colorClass =
        type === 'saida'
          ? 'text-red-500'
          : type === 'entrada'
            ? 'text-green-500'
            : 'text-primary';
      return (
        <span key={index} className={`font-semibold ${colorClass}`}>
          {part}
        </span>
      );
    }
    return part;
  });
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
      className='w-[95vw] max-w-[700px] h-full max-h-[80vh] overflow-y-auto'
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
            <Bell size={32} className='text-gray-400' />
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
            <Bell size={32} className='text-gray-400' />
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
                {group.alertas.map((alerta, index) => {
                  const alertaType = getAlertaType(alerta.conteudo);
                  return (
                    <div
                      key={alerta.id_alerta}
                      className='hover:bg-gray-50 transition-colors group'
                    >
                      {/* Borda entre alertas - ocupa 100% da largura */}
                      {index < group.alertas.length - 1 && (
                        <div className='absolute left-0 right-0 bottom-0 h-[2px] bg-[#EEF2F3]' />
                      )}

                      <div className='flex items-start gap-4 p-4 relative'>
                        {/* Ícone do alerta */}
                        {getAlertaIcon(alertaType)}

                        {/* Conteúdo do alerta */}
                        <div className='flex-1 min-w-0'>
                          {/* Linha 1: Título + Data */}
                          <div className='flex items-center gap-3 mb-1'>
                            <h4 className='text-base font-semibold text-gray-900'>
                              {getAlertaTitle(alertaType)}
                            </h4>
                            <span className='text-sm text-gray-500 whitespace-nowrap'>
                              {getTimeAgo(alerta.data)}
                            </span>
                          </div>

                          {/* Linha 2: Conteúdo */}
                          <p className='text-base text-gray-600 break-words'>
                            {formatConteudoWithColors(
                              alerta.conteudo,
                              alertaType
                            )}
                          </p>

                          {/* Link para metas (apenas para alertas de meta) */}
                          {alertaType === 'meta' && (
                            <Link
                              href='/metas'
                              className='text-primary font-medium text-base hover:underline mt-1 inline-block'
                            >
                              Ver metas
                            </Link>
                          )}
                        </div>

                        {/* Botão de marcar como lida */}
                        <button
                          onClick={() => handleMarkAsRead(alerta.id_alerta)}
                          className='text-gray-400 hover:text-gray-600 transition-colors self-start'
                          disabled={markAsRead.isPending}
                          aria-label='Marcar como lida'
                        >
                          <X size={28} />
                        </button>
                      </div>

                      {/* Borda inferior */}
                      {index < group.alertas.length - 1 && (
                        <div className='border-b-2 border-b-[#EEF2F3]' />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalDialog>
  );
};
