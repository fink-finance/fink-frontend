'use client';

import { useState, useEffect } from 'react';
import {
  Info,
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { useMovimentacoes } from '@/lib/hooks/movimentacoes';
import type { Movimentacao } from '@/lib/api/types/movimentacoes';
import { MovimentacaoDetailModal } from './MovimentacaoDetailModal';

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function categoriaPillClasses(categoria: string) {
  switch (categoria) {
    case 'Presentes':
      return 'bg-emerald-50 text-emerald-700';
    case 'Alimentação':
      return 'bg-rose-50 text-rose-700';
    case 'Transporte':
      return 'bg-slate-100 text-slate-700';
    case 'Salário':
      return 'bg-sky-50 text-sky-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

const MONTHS_PT_FULL = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const MONTHS_PT_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const WEEKDAYS_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function formatMovimentacaoDateTime(dateStr: string | undefined) {
  if (!dateStr) {
    return { dateLabel: '', timeLabel: '' };
  }

  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) {
    return { dateLabel: dateStr, timeLabel: '' };
  }

  const day = d.getDate().toString().padStart(2, '0');
  const month = MONTHS_PT_SHORT[d.getMonth()];
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');

  return {
    dateLabel: `${day} ${month}`,
    timeLabel: `${hours}:${minutes}`,
  };
}

function formatDisplayDate(dateStr?: string) {
  if (!dateStr) return 'dd/mm/aaaa';

  // Espera formato YYYY-MM-DD e evita usar new Date() pra não sofrer com fuso
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return 'dd/mm/aaaa';

  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

// Helpers para datas locais (sem timezone zoando)
function toLocalIsoDate(year: number, monthZeroBased: number, day: number) {
  const mm = (monthZeroBased + 1).toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function getTodayLocalIso() {
  const d = new Date();
  return toLocalIsoDate(d.getFullYear(), d.getMonth(), d.getDate());
}

interface MovimentacoesGridProps {
  fromDate?: string;
  toDate?: string;
  onCustomDateChange: (from?: string, to?: string) => void;
}

export function MovimentacoesGrid({
  fromDate,
  toDate,
  onCustomDateChange,
}: MovimentacoesGridProps) {
  // TODO: substituir por accountId vindo do fluxo real (conta selecionada)
  const ACCOUNT_ID = '619196f3-2474-44ce-ae30-0f5481bb66b7';

  // Busca (frontend)
  const [searchTerm, setSearchTerm] = useState('');

  // Modal de detalhes
  const [selectedMovimentacao, setSelectedMovimentacao] =
    useState<Movimentacao | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado do calendário custom
  const today = new Date();
  const todayIso = getTodayLocalIso();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const base = fromDate ? new Date(fromDate) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // Se o fromDate vier de fora (filtro rápido), sincroniza o mês exibido
  useEffect(() => {
    if (fromDate) {
      const d = new Date(fromDate);
      if (!Number.isNaN(d.getTime())) {
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
    }
  }, [fromDate]);

  const {
    data: movimentacoes = [],
    isLoading,
    isError,
  } = useMovimentacoes({
    accountId: ACCOUNT_ID,
    fromDate,
    toDate,
  });

  const totalEntradas = movimentacoes
    .filter((m) => m.tipo === 'entrada')
    .reduce((acc, m) => acc + m.valor, 0);

  const totalSaidas = movimentacoes
    .filter((m) => m.tipo === 'saida')
    .reduce((acc, m) => acc + m.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  const movimentacoesFiltradas = movimentacoes.filter((m) => {
    if (!searchTerm) return true;
    return m.descricao.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenDetails = (mov: Movimentacao) => {
    setSelectedMovimentacao(mov);
    setIsModalOpen(true);
  };

  const handleCloseDetails = (open: boolean) => {
    if (!open) {
      setIsModalOpen(false);
      setSelectedMovimentacao(null);
    } else {
      setIsModalOpen(true);
    }
  };

  // Helpers de calendário
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 (domingo) - 6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleSelectDate = (day: number) => {
    const iso = toLocalIsoDate(year, month, day);
    onCustomDateChange(iso, todayIso);
    setIsCalendarOpen(false);
  };

  const handleClearDate = () => {
    onCustomDateChange(undefined, todayIso);
    setIsCalendarOpen(false);
  };

  const handleToday = () => {
    const iso = todayIso;
    onCustomDateChange(iso, todayIso);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setIsCalendarOpen(false);
  };

  const selectedIso = fromDate ?? '';

  if (!ACCOUNT_ID) {
    return (
      <div className="container flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-600">
          Selecione uma conta para visualizar suas movimentações.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-600">Carregando movimentações...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-red-500">
          Erro ao carregar movimentações. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="container space-y-6 pb-10">
      {/* QUADRADÃO DE FILTROS */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        {/* Dropdown de contas (mockado) */}
        <div className="relative">
          <select
            className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm font-medium text-slate-700"
            defaultValue="todas"
          >
            <option value="todas">Todas as contas</option>
            <option value="nubank">Nubank</option>
          </select>
          <span className="pointer-events-none absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            $
          </span>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            ▼
          </span>
        </div>

        {/* Date picker custom -> filtro backend (from_date, to_date = hoje) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsCalendarOpen((open) => !open)}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700"
          >
            <CalendarIcon className="h-4 w-4 text-slate-500" />
            <span>{formatDisplayDate(fromDate)}</span>
          </button>

          {isCalendarOpen && (
            <div className="absolute z-20 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
              {/* Cabeçalho do mês */}
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(new Date(year, month - 1, 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  <ChevronLeft className="h-4 w-4 text-slate-600" />
                </button>

                <div className="text-sm font-medium text-slate-900">
                  {MONTHS_PT_FULL[month]} de {year}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentMonth(new Date(year, month + 1, 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100"
                >
                  <ChevronRight className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              {/* Cabeçalho dos dias da semana */}
              <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400">
                {WEEKDAYS_PT.map((day, index) => (
                  <div key={index}>{day}</div>
                ))}
              </div>

              {/* Dias do mês */}
              <div className="grid grid-cols-7 gap-1 text-sm">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={idx} className="h-8" />;
                  }

                  const iso = toLocalIsoDate(year, month, day);
                  const isSelected = iso === selectedIso;
                  const isToday = iso === todayIso;

                  let classes =
                    'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer text-slate-700 hover:bg-slate-100';

                  if (isSelected) {
                    classes =
                      'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-blue-600 text-white font-semibold';
                  } else if (isToday) {
                    classes =
                      'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border border-blue-500 text-blue-600';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectDate(day)}
                      className={classes}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Rodapé: limpar / hoje */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleClearDate}
                  className="font-medium text-slate-500 hover:text-slate-700"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={handleToday}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Hoje
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Busca – filtro frontend pela descrição */}
        <div className="relative flex-none w-[260px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar movimentação"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Saldo total */}
        <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-slate-100 bg-white px-8 py-6 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Saldo total
          </span>
          <span className="mt-2 text-3xl font-semibold text-slate-900">
            {formatCurrency(saldo)}
          </span>
        </div>

        {/* Entradas */}
        <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-slate-100 bg-white px-8 py-6 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Entradas
          </span>
          <div className="mt-2 flex items-center gap-2">
            <ArrowDownCircle className="h-6 w-6 text-emerald-500" />
            <span className="text-3xl font-normal text-slate-900">
              {formatCurrency(totalEntradas)}
            </span>
          </div>
        </div>

        {/* Saídas */}
        <div className="flex min-h-[120px] flex-col justify-center rounded-2xl border border-slate-100 bg-white px-8 py-6 shadow-sm">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Saídas
          </span>
          <div className="mt-2 flex items-center gap-2">
            <ArrowUpCircle className="h-6 w-6 text-rose-500" />
            <span className="text-3xl font-normal text-slate-900">
              {formatCurrency(totalSaidas)}
            </span>
          </div>
        </div>
      </div>

      {/* TABELA DE MOVIMENTAÇÕES */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="px-6 pt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Suas movimentações
        </div>

        <div className="mt-2 overflow-x-auto pb-2">
          <table className="min-w-full text-left text-base">
            <thead className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr className="bg-[#eef0ff]">
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3">Banco</th>
                <th className="px-6 py-3">Categoria</th>
                <th className="px-6 py-3">Recorrência</th>
                <th className="px-6 py-3 text-right">Valor</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {movimentacoesFiltradas.map((mov: Movimentacao) => (
                <tr
                  key={mov.id}
                  className="border-t border-slate-100 bg-white text-base transition-colors hover:bg-slate-50/80"
                >
                  {/* Data */}
                  <td className="px-6 py-4 align-middle">
                    {(() => {
                      const { dateLabel, timeLabel } =
                        formatMovimentacaoDateTime(mov.data);

                      return (
                        <div className="flex flex-col">
                          <span className="text-base font-medium text-slate-900">
                            {dateLabel}
                          </span>
                          {timeLabel && (
                            <span className="text-xs font-medium text-slate-500">
                              {timeLabel}
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </td>

                  {/* Descrição */}
                  <td className="px-6 py-4 align-middle">
                    <span className="text-base font-medium text-slate-900">
                      {mov.descricao}
                    </span>
                  </td>

                  {/* Banco */}
                  <td className="px-6 py-4 align-middle">
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#8A05BE]">
                      <Image
                        src="/images/banks/nubank-logo.png"
                        alt="Nubank"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Categoria */}
                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${categoriaPillClasses(
                        mov.categoria,
                      )}`}
                    >
                      {mov.categoria}
                    </span>
                  </td>

                  {/* Recorrência */}
                  <td className="px-6 py-4 align-middle text-base font-medium text-slate-900">
                    {mov.recorrencia}
                  </td>

                  {/* Valor + método de pagamento */}
                  <td className="px-6 py-4 align-middle text-right">
                    <div className="flex flex-col items-end">
                      <span
                        className={
                          mov.tipo === 'entrada'
                            ? 'text-base font-semibold text-emerald-600'
                            : 'text-base font-semibold text-rose-600'
                        }
                      >
                        {formatCurrency(mov.valor)}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {mov.origemPagamento}
                      </span>
                    </div>
                  </td>

                  {/* Botão info */}
                  <td className="px-4 py-4 pr-6 align-middle">
                    <button
                      className="rounded-full border border-slate-300 p-2 hover:bg-slate-100"
                      onClick={() => handleOpenDetails(mov)}
                    >
                      <Info className="h-5 w-5 text-slate-900" />
                    </button>
                  </td>
                </tr>
              ))}

              {movimentacoesFiltradas.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    Nenhuma movimentação encontrada para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE DETALHES */}
      <MovimentacaoDetailModal
        movimentacao={selectedMovimentacao}
        open={isModalOpen}
        onOpenChange={handleCloseDetails}
      />
    </div>
  );
}
