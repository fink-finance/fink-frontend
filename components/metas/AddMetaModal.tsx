'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCreateMeta } from '@/lib/hooks/metas/mutations/use-create-meta';
import type { CreateMetaData } from '@/lib/api/types/meta';
import { MetaCategoria } from '@/lib/api/types/meta';
import { cn } from '@/lib/utils';
import {
  CATEGORIA_ICONS,
  CATEGORY_BG_COLORS,
  CATEGORY_TEXT_COLORS,
} from './MetaCard';
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

// ✅ Categorias disponíveis
const CATEGORIAS = Object.values(MetaCategoria);

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: '',
      categoria: undefined, // ✅ Opcional - backend usa "Outros" como padrão
      valor_alvo: 0,
      termina_em: '',
    },
  });

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
                          step='0.01'
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
                                    CATEGORY_BG_COLORS[
                                      field.value as MetaCategoria
                                    ] ||
                                      CATEGORY_BG_COLORS[MetaCategoria.OUTROS]
                                  )}
                                >
                                  <IconComponent
                                    className={cn(
                                      'w-4 h-4',
                                      CATEGORY_TEXT_COLORS[
                                        field.value as MetaCategoria
                                      ] ||
                                        CATEGORY_TEXT_COLORS[
                                          MetaCategoria.OUTROS
                                        ]
                                    )}
                                  />
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
                      <Input
                        type='date'
                        {...field}
                        className='h-12 text-base'
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
              {isPending ? 'Criando...' : 'Criar nova meta'}
            </Button>
          </div>
        </form>
      </Form>
    </ModalDialog>
  );
};
