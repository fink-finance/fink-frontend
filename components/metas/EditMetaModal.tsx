'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import * as z from 'zod';
import { useUpdateMeta } from '@/lib/hooks/metas/mutations/use-update-meta';
import type { UpdateMetaData } from '@/lib/api/types/meta';
import { MetaCategoria, MetaStatus } from '@/lib/api/types/meta';
import { Meta } from '@/lib/api/types';
import { cn } from '@/lib/utils';
import { CATEGORIA_ICONS } from '../metas/MetaCard';
import { ModalDialog } from '../shared/ModalDialog';
import { DatePickerInput } from '../shared/DatePickerInput';
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

// Categorias disponíveis
const CATEGORIAS = Object.values(MetaCategoria);

// Schema de validação Zod
const formSchema = z.object({
  status: z.enum([MetaStatus.EM_ANDAMENTO, MetaStatus.CANCELADA]),

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
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      {
        message: 'A data final deve ser hoje ou uma data futura',
      }
    ),
});

type FormValues = z.infer<typeof formSchema>;

type EditMetaModalProps = {
  meta: Meta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CATEGORY_BG_FORM_COLORS: Record<MetaCategoria, string> = {
  [MetaCategoria.VIAGEM]: 'bg-accent',
  [MetaCategoria.COMPRAS]: 'bg-blue-200',
  [MetaCategoria.EMERGENCIA]: 'bg-red-300',
  [MetaCategoria.OUTROS]: 'bg-blue-200',
};

export const EditMetaModal = ({
  meta,
  open,
  onOpenChange,
}: EditMetaModalProps) => {
  const { mutate: updateMeta, isPending } = useUpdateMeta();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: MetaStatus.EM_ANDAMENTO,
      titulo: '',
      categoria: undefined,
      valor_alvo: 0,
      termina_em: '',
    },
  });

  // Preencher formulário quando meta mudar
  useEffect(() => {
    if (meta) {
      form.reset({
        status:
          meta.status === MetaStatus.CANCELADA
            ? MetaStatus.CANCELADA
            : MetaStatus.EM_ANDAMENTO,
        titulo: meta.titulo,
        categoria: meta.categoria || undefined,
        valor_alvo: Number(meta.valor_alvo),
        termina_em: meta.termina_em
          ? new Date(meta.termina_em).toISOString().split('T')[0]
          : '',
      });
    }
  }, [meta, form]);

  const onSubmit = (data: FormValues) => {
    if (!meta) return;

    const metaData: UpdateMetaData = {
      status: data.status,
      titulo: data.titulo,
      valor_alvo: data.valor_alvo,
      termina_em: data.termina_em,
      ...(data.categoria && { categoria: data.categoria }),
    };

    console.log('📤 Dados enviados ao backend:', metaData);

    updateMeta(
      { id: meta.id_meta, data: metaData },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
        onError: (error: any) => {
          console.error('❌ Erro ao atualizar meta:', error);
          console.error('❌ Error status:', error.status);
          console.error('❌ Error details:', error.details);
          console.error('❌ Error message:', error.message);
        },
      }
    );
  };

  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Edição de meta'
      className='w-[95vw] h-full max-w-[800px] max-h-[80vh] overflow-y-auto'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col h-full'
        >
          <div className='space-y-6 pb-6 flex-1'>
            {/* Toggle Ativa/Inativa */}
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex rounded-full border max-w-max'>
                      <Button
                        type='button'
                        onClick={() => field.onChange(MetaStatus.EM_ANDAMENTO)}
                        className={`px-6 py-2 rounded-full font-medium transition-colors shadow-none ${
                          field.value === MetaStatus.EM_ANDAMENTO
                            ? 'bg-[#2D9E20] text-white hover:bg-accent'
                            : 'bg-white text-[#808088] hover:bg-accent hover:text-white'
                        }`}
                      >
                        Ativa
                      </Button>
                      <Button
                        type='button'
                        onClick={() => field.onChange(MetaStatus.CANCELADA)}
                        className={`px-6 py-2 rounded-full font-medium transition-colors shadow-none ${
                          field.value === MetaStatus.CANCELADA
                            ? 'bg-muted text-white hover:bg-zinc-500'
                            : 'bg-white text-[#808088] hover:bg-zinc-500 hover:text-white'
                        }`}
                      >
                        Inativa
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Grid com 2 colunas */}
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
                          className='h-12 text-lg pl-10'
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
                render={({ field }) => (
                  <FormItem className='space-y-0.5'>
                    <FormLabel className='text-base'>Data final *</FormLabel>
                    <FormControl>
                      <DatePickerInput
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </div>
        </form>
      </Form>
    </ModalDialog>
  );
};
