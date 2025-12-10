'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCreateMeta } from '@/lib/hooks/metas/mutations/use-create-meta';
import type { CreateMetaData } from '@/lib/api/types/meta';
import { MetaCategoria } from '@/lib/api/types/meta';
import { cn } from '@/lib/utils';
import { CATEGORIA_ICONS } from './MetaCard';
import { ModalDialog } from '../shared/ModalDialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_BG_FORM_COLORS } from './EditMetaModal';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ✅ Categorias disponíveis
const CATEGORIAS = Object.values(MetaCategoria);

// ✅ Constantes do calendário
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

// ✅ Helpers para datas locais
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

// ✅ Schema de validação Zod com validações avançadas
const formSchema = z.object({
  titulo: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(50, 'O título deve ter no máximo 50 caracteres'),

  categoria: z.string().optional(),

  valor_alvo: z
    .number({
      message: 'Digite um valor válido',
    })
    .positive('O valor deve ser positivo')
    .min(0.01, 'O valor mínimo é R$ 0,01')
    .max(999999999.99, 'O valor é muito alto'),

  termina_em: z
    .string()
    .min(1, 'A data final é obrigatória')
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove horas para comparar só a data
        return selectedDate >= today;
      },
      {
        message: 'A data final deve ser hoje ou uma data futura',
      }
    ),
});

type FormValues = z.infer<typeof formSchema>;

interface AddMetaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddMetaModal = ({ open, onOpenChange }: AddMetaModalProps) => {
  const { mutate: createMeta, isPending } = useCreateMeta();

  // Estado do calendário
  const today = new Date();
  const todayIso = getTodayLocalIso();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      categoria: undefined, // ✅ Opcional - backend usa "Outros" como padrão
      valor_alvo: 0,
      termina_em: '',
    },
  });

  // Reseta o calendário quando o modal fecha
  useEffect(() => {
    if (!open) {
      setIsCalendarOpen(false);
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [open]);

  // Helpers do calendário
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const onSubmit = (data: FormValues) => {
    // ✅ Só envia categoria se o usuário selecionar (backend usa "Outros" como padrão)
    const metaData: CreateMetaData = {
      titulo: data.titulo,
      valor_alvo: data.valor_alvo,
      termina_em: data.termina_em,
      ...(data.categoria && { categoria: data.categoria }),
    };

    console.log('📤 Dados enviados ao backend:', metaData);

    createMeta(metaData, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
      onError: (error: any) => {
        console.error('❌ Erro ao criar meta:', error);
        console.error('❌ Error status:', error.status);
        console.error('❌ Error details:', error.details);
        console.error('❌ Error message:', error.message);
      },
    });
  };

  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Criar nova meta'
      className='w-[95vw] h-full max-w-[800px] max-h-[80vh] overflow-y-auto'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col h-full'
        >
          <div className='space-y-6 pb-6 flex-1'>
            {/* Grid com 2 colunas - TODOS os campos */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-6'>
              {/* Título */}
              <FormField
                control={form.control}
                name='titulo'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel className='text-base'>Título *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ex: Comprar um imóvel'
                        {...field}
                        className='h-12 text-base'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Valor alvo */}
              <FormField
                control={form.control}
                name='valor_alvo'
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel className='text-base'>Valor da meta *</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-primary text-base font-semibold'>
                          R$
                        </span>
                        <Input
                          type='number'
                          step='1.00'
                          min='0'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          className='h-12 text-base pl-10'
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Categoria */}
              <FormField
                control={form.control}
                name='categoria'
                render={({ field }) => {
                  const IconComponent = field.value
                    ? CATEGORIA_ICONS[field.value] ||
                      CATEGORIA_ICONS[MetaCategoria.OUTROS]
                    : null;

                  return (
                    <FormItem className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Categoria (opcional)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='h-12 text-base'>
                            {field.value && IconComponent ? (
                              <div className='flex items-center gap-2 w-full'>
                                <div
                                  className={cn(
                                    'flex items-center justify-center w-6 h-6 rounded-full',
                                    CATEGORY_BG_FORM_COLORS[
                                      field.value as MetaCategoria
                                    ]
                                  )}
                                >
                                  <IconComponent className='w-3 h-3 text-black' />
                                </div>
                                <SelectValue>{field.value}</SelectValue>
                              </div>
                            ) : (
                              <SelectValue placeholder='Selecione a categoria' />
                            )}
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIAS.map((categoria) => {
                            const ItemIcon =
                              CATEGORIA_ICONS[categoria] ||
                              CATEGORIA_ICONS[MetaCategoria.OUTROS];
                            return (
                              <SelectItem key={categoria} value={categoria}>
                                <div className='flex items-center gap-2'>
                                  <ItemIcon className='w-4 h-4' />
                                  <span>{categoria}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Data final */}
              <FormField
                control={form.control}
                name='termina_em'
                render={({ field }) => {
                  const selectedIso = field.value ?? '';

                  const handleSelectDate = (day: number) => {
                    const iso = toLocalIsoDate(year, month, day);
                    field.onChange(iso);
                    setIsCalendarOpen(false);
                  };

                  const handleClearDate = () => {
                    field.onChange('');
                    setIsCalendarOpen(false);
                  };

                  const handleToday = () => {
                    field.onChange(todayIso);
                    setCurrentMonth(
                      new Date(today.getFullYear(), today.getMonth(), 1)
                    );
                    setIsCalendarOpen(false);
                  };

                  return (
                    <FormItem className='space-y-0.5'>
                      <FormLabel className='text-base'>Data final *</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <button
                            type='button'
                            onClick={() => setIsCalendarOpen((open) => !open)}
                            className={cn(
                              'inline-flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-700 hover:bg-slate-50 transition-colors',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className='h-5 w-5 text-slate-500' />
                            <span>{formatDisplayDate(field.value)}</span>
                          </button>

                          {isCalendarOpen && (
                            <div className='absolute z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg'>
                              {/* Cabeçalho do mês */}
                              <div className='mb-3 flex items-center justify-between'>
                                <button
                                  type='button'
                                  onClick={() =>
                                    setCurrentMonth(
                                      new Date(year, month - 1, 1)
                                    )
                                  }
                                  className='flex h-7 w-7 items-center justify-center rounded-full hover:bg-slate-100'
                                >
                                  <ChevronLeft className='h-4 w-4 text-slate-600' />
                                </button>

                                <div className='text-sm font-medium text-slate-900'>
                                  {MONTHS_PT_FULL[month]} de {year}
                                </div>

                                <button
                                  type='button'
                                  onClick={() =>
                                    setCurrentMonth(
                                      new Date(year, month + 1, 1)
                                    )
                                  }
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          {/* Botões - fixos na parte inferior */}
          <div className='flex justify-end gap-3 pt-4 mt-auto'>
            <Button
              type='button'
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              size='lg'
              radius='xl'
              className='bg-zinc-200 hover:bg-zinc-300 text-foreground font-medium px-8 h-12'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              disabled={isPending}
              size='lg'
              radius='xl'
              className='font-medium px-8 h-12'
            >
              {isPending ? 'Criando...' : 'Criar nova meta'}
            </Button>
          </div>
        </form>
      </Form>
    </ModalDialog>
  );
};
