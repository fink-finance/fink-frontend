'use client';

import { useState } from 'react';
import { Meta } from '@/lib/api/types';
import { ModalDialog } from '../shared/ModalDialog';
import { MetaCard } from './MetaCard';
import { EditMetaModal } from './EditMetaModal';
import { Button } from '../ui/button';
import { DashCircleFill, PenFill, PlusCircle } from 'react-bootstrap-icons';

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

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

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

          {/* Botões com borda inferior */}
          <div className='border-b py-6 px-2 md:px-0'>
            <div className='flex items-center justify-between gap-4'>
              <Button
                variant='gray'
                className='flex items-center gap-2'
                size='xl'
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
                  size='xl'
                  radius='xl'
                >
                  <DashCircleFill size={20} />
                  Retirar saldo
                </Button>

                <Button
                  className='flex items-center gap-2'
                  size='xl'
                  radius='xl'
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

          {/* Seção de Movimentações (vazia por enquanto) */}
          <div className='py-4'>
            <h3 className='text-lg font-semibold mb-4'>
              Movimentações da meta
            </h3>
            {/* Movimentações serão implementadas depois */}
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
