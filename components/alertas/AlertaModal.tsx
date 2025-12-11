'use client';

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

type AlertaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type AlertaGroup = {
  title: string;
  alertas: Alerta[];
};

type FilterType = 'todos' | 'hoje' | 'ultima-semana' | 'ultimo-mes';

const getAlertaIcon = (conteudo: string) => {
  const content = conteudo.toLowerCase();

  if (content.includes('saída') || content.includes('saida')) {
    return (
      <div className='w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0'>
        <ArrowUp className='text-red-600' size={20} />
      </div>
    );
  }

  if (content.includes('entrada')) {
    return (
      <div className='w-12 h-12 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0'>
        <ArrowDown className='text-green-600' size={20} />
      </div>
    );
  }

  if (content.includes('meta')) {
    return (
      <div className='w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0'>
        <PiggyBank className='text-blue-600' size={20} />
      </div>
    );
  }

  return (
    <div className='w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0'>
      <Lightbulb className='text-blue-600' size={20} />
    </div>
  );
};

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

export const AlertaModal = ({ open, onOpenChange }: AlertaModalProps) => {
  const { data: alertas, isLoading } = useAlertasNaoLidos();
  const markAsRead = useMarkAlertaAsRead();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todos');

  const groupedAlertas = useMemo(() => {
    if (!alertas) return [];

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const groups: AlertaGroup[] = [
      { title: 'Hoje', alertas: [] },
      { title: 'Última semana', alertas: [] },
      { title: 'Último mês', alertas: [] },
    ];

    alertas.forEach((alerta) => {
      const alertaDate = new Date(alerta.data);
      const alertaDay = new Date(
        alertaDate.getFullYear(),
        alertaDate.getMonth(),
        alertaDate.getDate()
      );

      if (alertaDay.getTime() === today.getTime()) {
        groups[0].alertas.push(alerta);
      } else if (alertaDay >= lastWeek) {
        groups[1].alertas.push(alerta);
      } else if (alertaDay >= lastMonth) {
        groups[2].alertas.push(alerta);
      }
    });

    // Filtrar grupos baseado no filtro selecionado
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

    // Para "todos", retornar apenas grupos com alertas
    return groups.filter((group) => group.alertas.length > 0);
  }, [alertas, selectedFilter]);

  const handleMarkAsRead = (id: number) => {
    markAsRead.mutate({ id, lida: true });
  };

  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Notificações'
      className='max-w-2xl max-h-[80vh]'
    >
      {/* Filtros */}
      <div className='flex gap-3 mb-6 -mt-2'>
        <button
          onClick={() => setSelectedFilter('todos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'todos'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          <Infinity size={16} />
          <span className='text-sm font-medium'>Todas</span>
        </button>
        <button
          onClick={() => setSelectedFilter('hoje')}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'hoje'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          <span className='text-sm font-medium'>Hoje</span>
        </button>
        <button
          onClick={() => setSelectedFilter('ultima-semana')}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'ultima-semana'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          <span className='text-sm font-medium'>Última semana</span>
        </button>
        <button
          onClick={() => setSelectedFilter('ultimo-mes')}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedFilter === 'ultimo-mes'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          <span className='text-sm font-medium'>Último mês</span>
        </button>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      ) : !alertas || alertas.length === 0 ? (
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
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
            <Lightbulb size={32} className='text-gray-400' />
          </div>
          <p className='text-gray-500 text-lg'>
            Nenhuma notificação neste período
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {groupedAlertas.map((group) => (
            <div key={group.title}>
              <h3
                className='text-sm font-bold text-white px-4 py-2 mb-3'
                style={{
                  borderRadius: '0 24px 0 0',
                  background:
                    'linear-gradient(90deg, #0066FF 0%, #00A3FF 100%)',
                }}
              >
                {group.title}
              </h3>
              <div>
                {group.alertas.map((alerta, index) => (
                  <div
                    key={alerta.id_alerta}
                    className={`flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors group ${
                      index < group.alertas.length - 1 ? 'border-b' : ''
                    }`}
                    style={{
                      borderColor:
                        index < group.alertas.length - 1
                          ? '#EEF2F3'
                          : 'transparent',
                    }}
                  >
                    {getAlertaIcon(alerta.conteudo)}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-start justify-between gap-2'>
                        <div className='flex-1'>
                          <p className='text-sm font-medium text-gray-900 break-words'>
                            {alerta.conteudo.split('.')[0]}
                          </p>
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
                        <span className='text-xs text-gray-500 whitespace-nowrap'>
                          {getTimeAgo(alerta.data)}
                        </span>
                      </div>
                    </div>
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
