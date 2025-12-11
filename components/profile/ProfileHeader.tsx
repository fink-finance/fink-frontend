// ProfileHeader.tsx
import { Button } from '@/components/ui/button';
import { FiEdit } from 'react-icons/fi';
import Image from 'next/image';

interface ProfileHeaderProps {
  nome: string;
  idade: number;
  cpf: string;
  email: string;
  telefone: string;
}

export function ProfileHeader({
  nome,
  idade,
  cpf,
  email,
  telefone,
}: ProfileHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="h-[64px] w-[64px] flex-shrink-0 overflow-hidden rounded-full bg-primary">
          <Image
            src="/images/profile/Foto Gabriel.jpg"
            alt={nome}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="mb-1 text-3xl font-semibold text-slate-900">
            {nome}
          </h2>
          <p className="mb-3 text-base text-slate-500">{idade} anos</p>

          <div className="flex flex-wrap items-center gap-4 text-base text-slate-900">
            <span>{cpf}</span>
            <span className="h-4 w-px bg-slate-200" />
            <span>{email}</span>
            <span className="h-4 w-px bg-slate-200" />
            <span>{telefone}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="flex h-[38px] items-center gap-2 px-4 text-sm font-medium"
      >
        <FiEdit size={18} />
        Editar
      </Button>
    </div>
  );
}
