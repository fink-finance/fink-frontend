'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Meta } from '@/lib/api/types';
import { ModalDialog } from '../shared/ModalDialog';
import { MetaCard } from './MetaCard';
import { EditMetaModal } from './EditMetaModal';
import { useMovimentacoes } from '@/lib/hooks/metas/queries/use-movimentacoes';
import { useAtualizarSaldo } from '@/lib/hooks/metas/mutations/use-atualizar-saldo';
import type { AtualizarSaldoData } from '@/lib/api/types/meta';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  DashCircleFill,
  PenFill,
  PlusCircle,
  PlusCircleFill,
} from 'react-bootstrap-icons';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import { cn } from '@/lib/utils';

// Schema de validação Zod
const movimentacaoFormSchema = z.object({
  valor: z
    .number('Digite um valor válido')
    .positive('O valor deve ser positivo')
    .min(0.01, 'O valor mínimo é R$ 0,01')
    .max(999999999.99, 'O valor é muito alto'),

  data: z
    .string()
    .min(1, 'A data é obrigatória')
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        return !isNaN(selectedDate.getTime());
      },
      {
        message: 'Data inválida',
      }
    ),
});

type MovimentacaoFormValues = z.infer<typeof movimentacaoFormSchema>;

type MetaDetailModalProps = {
  meta: Meta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const MetaDetailModal = ({
  meta,
  open,
  onOpenChange,
}: MetaDetailModalProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tipoMovimentacao, setTipoMovimentacao] = useState<
    'adicionar' | 'retirar' | null
  >(null);

  // Buscar movimentações da meta
  const { data: movimentacoes = [], isLoading: isLoadingMovimentacoes } =
    useMovimentacoes(meta?.id_meta ?? 0, {
      enabled: !!meta?.id_meta && open,
    });

  const { mutate: atualizarSaldo, isPending: isUpdatingSaldo } =
    useAtualizarSaldo();

  // Formulário de movimentação
  const movimentacaoForm = useForm<MovimentacaoFormValues>({
    resolver: zodResolver(movimentacaoFormSchema),
    defaultValues: {
      valor: 0,
      data: new Date().toISOString().split('T')[0],
    },
  });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAdicionarSaldo = () => {
    setTipoMovimentacao('adicionar');
    movimentacaoForm.reset({
      valor: 0,
      data: new Date().toISOString().split('T')[0],
    });
  };

  const handleRetirarSaldo = () => {
    setTipoMovimentacao('retirar');
    movimentacaoForm.reset({
      valor: 0,
      data: new Date().toISOString().split('T')[0],
    });
  };

  const handleCancelarMovimentacao = () => {
    setTipoMovimentacao(null);
    movimentacaoForm.reset({
      valor: 0,
      data: new Date().toISOString().split('T')[0],
    });
  };

  const onSubmitMovimentacao = (data: MovimentacaoFormValues) => {
    if (!meta || !tipoMovimentacao) return;

    // Enviar valor sempre positivo e incluir a ação
    const saldoData: AtualizarSaldoData = {
      valor: Math.abs(data.valor),
      action: tipoMovimentacao === 'adicionar' ? 'adicionado' : 'retirado',
      data: data.data,
    };

    atualizarSaldo(
      { id: meta.id_meta, data: saldoData },
      {
        onSuccess: () => {
          movimentacaoForm.reset({
            valor: 0,
            data: new Date().toISOString().split('T')[0],
          });
          setTipoMovimentacao(null);
        },
        onError: (error: any) => {
          console.error('❌ Erro ao atualizar saldo:', error);
          console.error('❌ Error status:', error.status);
          console.error('❌ Error details:', error.details);
          console.error('❌ Error message:', error.message);
        },
      }
    );
  };

  // Ordenar movimentações por data (mais recente primeiro)
  const sortedMovimentacoes = [...movimentacoes].sort((a, b) => {
    const dateA = new Date(a.data).getTime();
    const dateB = new Date(b.data).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <ModalDialog
        open={open}
        onOpenChange={onOpenChange}
        title='Detalhamento da meta'
        className='w-[95vw] h-full max-w-[800px] max-h-[80vh] overflow-y-auto'
      >
        <div className='w-full space-y-0'>
          {/* MetaCard com borda inferior */}
          <div className='border-b pb-4'>
            {meta && (
              <MetaCard
                meta={meta}
                className='shadow-none rounded-none [&>div]:p-2 [&>div]:md:pt-2 [&>div]:space-y-3'
              />
            )}
          </div>

          {/* Formulário de Movimentação */}
          {tipoMovimentacao && (
            <div className='border-b py-6 px-2 md:px-0'>
              <Form {...movimentacaoForm}>
                <form
                  onSubmit={movimentacaoForm.handleSubmit(onSubmitMovimentacao)}
                  className='space-y-4'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Campo Valor */}
                    <FormField
                      control={movimentacaoForm.control}
                      name='valor'
                      render={({ field }) => (
                        <FormItem className='space-y-0.5'>
                          <FormLabel className='text-base'>
                            {tipoMovimentacao === 'adicionar'
                              ? 'Valor a adicionar *'
                              : 'Valor a retirar *'}
                          </FormLabel>
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
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className='h-12 text-lg pl-10'
                                placeholder='0,00'
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Campo Data */}
                    <FormField
                      control={movimentacaoForm.control}
                      name='data'
                      render={({ field }) => (
                        <FormItem className='space-y-0.5'>
                          <FormLabel className='text-base'>Quando? *</FormLabel>
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

                  {/* Botões do formulário */}
                  <div className='flex justify-end gap-3 pt-2'>
                    <Button
                      type='button'
                      onClick={handleCancelarMovimentacao}
                      disabled={isUpdatingSaldo}
                      size='lg'
                      radius='xl'
                      className='bg-zinc-200 hover:bg-zinc-300 text-foreground font-medium px-8 h-12'
                    >
                      Cancelar
                    </Button>
                    <Button
                      type='submit'
                      disabled={isUpdatingSaldo}
                      size='lg'
                      radius='xl'
                      className='font-medium px-8 h-12'
                    >
                      {isUpdatingSaldo
                        ? 'Salvando...'
                        : tipoMovimentacao === 'adicionar'
                          ? 'Confirmar adição'
                          : 'Confirmar retirada'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* Botões com borda inferior - escondidos quando formulário de movimentação está ativo */}
          {!tipoMovimentacao && (
            <div className='py-6 px-2 md:px-0'>
              <div className='flex items-center justify-between gap-4'>
                <Button
                  variant='gray'
                  className='flex items-center gap-2'
                  size='lg'
                  radius='xl'
                  onClick={handleEditClick}
                >
                  <PenFill size={20} />
                  Editar meta
                </Button>

                <div className='flex items-center gap-3'>
                  <Button
                    variant='gray'
                    className='flex items-center gap-2 hover:bg-destructive hover:text-white'
                    size='lg'
                    radius='xl'
                    onClick={handleRetirarSaldo}
                  >
                    <DashCircleFill size={20} />
                    Retirar saldo
                  </Button>

                  <Button
                    className='flex items-center gap-2'
                    size='lg'
                    radius='xl'
                    onClick={handleAdicionarSaldo}
                  >
                    <PlusCircle
                      size={20}
                      className='bg-white text-black rounded-full'
                    />
                    Adicionar saldo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Seção de Movimentações */}
          <div className='py-4'>
            <h3 className='text-md font-bold mb-4'>Movimentações da meta</h3>
            {isLoadingMovimentacoes ? (
              <div className='text-center py-8 text-gray-500'>
                Carregando movimentações...
              </div>
            ) : sortedMovimentacoes.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                Nenhuma movimentação registrada ainda.
              </div>
            ) : (
              <div className='space-y-4'>
                {sortedMovimentacoes.map((movimentacao) => {
                  const isAdicionado = movimentacao.acao === 'adicionado';
                  const formattedDate = new Date(
                    movimentacao.data
                  ).toLocaleDateString('pt-BR');
                  const formattedValue = toBRCurrency(
                    Math.abs(movimentacao.valor)
                  );

                  return (
                    <div key={movimentacao.id_movimentacao}>
                      <div className='border-b pb-1 '>
                        <div className='ml-2'>
                          <span className='text-md font-medium text-[#808088]'>
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 py-2 ml-2'>
                        {isAdicionado ? (
                          <PlusCircleFill
                            size={18}
                            className='text-green-600 flex-shrink-0'
                          />
                        ) : (
                          <DashCircleFill
                            size={18}
                            className='text-red-600 flex-shrink-0'
                          />
                        )}
                        <span className='text-md font-medium'>
                          {isAdicionado ? 'Valor adicionado' : 'Valor retirado'}
                        </span>
                        <span
                          className={cn(
                            'ml-auto text-sm font-medium',
                            isAdicionado ? 'text-[#2D9E20]' : 'text-[#EC1312]'
                          )}
                        >
                          {formattedValue}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ModalDialog>

      {/* Modal de Edição */}
      <EditMetaModal
        meta={meta}
        open={isEditModalOpen}
        onOpenChange={handleCloseEditModal}
      />
    </>
  );
};
