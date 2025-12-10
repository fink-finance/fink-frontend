'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Constantes do calendário
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

const WEEKDAYS_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Helpers para datas locais
function toLocalIsoDate(year: number, monthZeroBased: number, day: number) {
  const mm = (monthZeroBased + 1).toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function getTodayLocalIso() {
  const d = new Date();
  return toLocalIsoDate(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDisplayDate(dateStr?: string) {
  if (!dateStr) return 'dd/mm/aaaa';
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return 'dd/mm/aaaa';
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
}

interface DatePickerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePickerInput = ({
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
  className,
  disabled = false,
}: DatePickerInputProps) => {
  const today = new Date();
  const todayIso = getTodayLocalIso();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
      }
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  // Sincroniza o mês exibido quando o valor muda externamente
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
    }
  }, [value]);

  // Helpers do calendário
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedIso = value ?? '';

  const handleSelectDate = (day: number) => {
    const iso = toLocalIsoDate(year, month, day);
    onChange(iso);
    setIsCalendarOpen(false);
  };

  const handleClearDate = () => {
    onChange('');
    setIsCalendarOpen(false);
  };

  const handleToday = () => {
    onChange(todayIso);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setIsCalendarOpen(false);
  };

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => !disabled && setIsCalendarOpen((open) => !open)}
        disabled={disabled}
        className={cn(
          'inline-flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-700 hover:bg-slate-50 transition-colors',
          !value && 'text-muted-foreground',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <CalendarIcon className='h-5 w-5 text-slate-500' />
        <span>{value ? formatDisplayDate(value) : placeholder}</span>
      </button>

      {isCalendarOpen && (
        <div className='absolute z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg'>
          {/* Cabeçalho do mês */}
          <div className='mb-3 flex items-center justify-between'>
            <button
              type='button'
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className='flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100'
            >
              <ChevronLeft className='h-4 w-4 text-slate-600' />
            </button>

            <div className='text-sm font-medium text-slate-900'>
              {MONTHS_PT_FULL[month]} de {year}
            </div>

            <button
              type='button'
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className='flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100'
            >
              <ChevronRight className='h-4 w-4 text-slate-600' />
            </button>
          </div>

          {/* Cabeçalho dos dias da semana */}
          <div className='mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400'>
            {WEEKDAYS_PT.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className='grid grid-cols-7 gap-1 text-sm'>
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className='h-8' />;
              }

              const iso = toLocalIsoDate(year, month, day);
              const isSelected = iso === selectedIso;
              const isToday = iso === todayIso;

              let classes =
                'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer text-slate-700 hover:bg-slate-100';

              if (isSelected) {
                classes =
                  'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer bg-primary text-white font-semibold';
              } else if (isToday) {
                classes =
                  'flex h-8 w-8 items-center justify-center rounded-full cursor-pointer border border-primary text-primary';
              }

              return (
                <button
                  key={idx}
                  type='button'
                  onClick={() => handleSelectDate(day)}
                  className={classes}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Rodapé: limpar / hoje */}
          <div className='mt-3 flex items-center justify-between text-xs'>
            <button
              type='button'
              onClick={handleClearDate}
              className='font-medium text-slate-500 hover:text-slate-700'
            >
              Limpar
            </button>
            <button
              type='button'
              onClick={handleToday}
              className='font-medium text-primary hover:text-primary/80'
            >
              Hoje
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
