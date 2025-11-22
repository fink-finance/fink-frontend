'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCreateMeta } from '@/lib/hooks/metas/mutations/use-create-meta';
import type { CreateMetaData } from '@/lib/api/types/meta';
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

// ✅ Schema de validação Zod - apenas campos necessários
const formSchema = z.object({
  titulo: z.string().min(1, 'O título é obrigatório'),
  descricao: z.string().min(1, 'A descrição é obrigatória'),
  valor_alvo: z.number().positive('O valor deve ser positivo'),
  termina_em: z.string().min(1, 'A data final é obrigatória'),
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
      descricao: '',
      valor_alvo: 0,
      termina_em: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // ✅ Dados já estão no formato correto (CreateMetaData)
    const metaData: CreateMetaData = data;

    createMeta(metaData, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        console.error('Erro ao criar meta:', error);
      },
    });
  };

  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Criar nova meta'
      className='w-[95vw] max-w-[800px] min-h-[600px] max-h-[90vh] overflow-y-auto'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Título */}
          <FormField
            control={form.control}
            name='titulo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Título <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Digite o título da meta' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descrição */}
          <FormField
            control={form.control}
            name='descricao'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descrição <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Descreva sua meta' {...field} />
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
              <FormItem>
                <FormLabel>
                  Valor da meta <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    step='0.01'
                    min='0'
                    placeholder='0.00'
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Data final */}
          <FormField
            control={form.control}
            name='termina_em'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Data final <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botões */}
          <div className='flex justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Criando...' : 'Criar nova meta'}
            </Button>
          </div>
        </form>
      </Form>
    </ModalDialog>
  );
};
