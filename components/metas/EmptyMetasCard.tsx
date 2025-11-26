import Image from 'next/image';
import { DashboardCard } from '../shared/DashboardCard';
import { useState } from 'react';
import { AddMetaButton } from './AddMetaButton';
import { AddMetaModal } from './AddMetaModal';

export const EmptyMetasCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DashboardCard
        title='Criar nova meta'
        subtitle='Comece agora a planejar seus sonhos'
        className='h-full bg-emptyCardBg overflow-hidden'
        icon={<AddMetaButton onClick={() => setIsModalOpen(true)} />}
      >
        <div className='relative w-full flex-1 min-h-[200px]'>
          {/* Imagem de fundo - esticada e posicionada para baixo */}
          <div className='absolute top-12 left-0 right-0 bottom-[-80px] -mx-6'>
            <Image
              src='/images/metas/bg_metas.png'
              alt=''
              fill
              className='object-cover object-top scale-x-110'
              aria-hidden='true'
              priority
            />
          </div>
        </div>
      </DashboardCard>

      <AddMetaModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
