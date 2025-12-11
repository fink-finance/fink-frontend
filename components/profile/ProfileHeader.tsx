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
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-start gap-4">
        {/* FOTO DE PERFIL (substitui a bolona azul com inicial) */}
        <div className="h-[55px] w-[55px] rounded-full overflow-hidden bg-primary flex-shrink-0">
          <Image
            src="/images/profile/Foto Gabriel.jpg"
            alt={nome}
            width={55}
            height={55}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2
            className="text-2xl font-bold text-foreground mb-1"
            style={{ fontFamily: 'DM Sans' }}
          >
            {nome}
          </h2>
          <p
            className="text-sm text-muted mb-2"
            style={{ fontFamily: 'DM Sans' }}
          >
            {idade} anos
          </p>

          <div
            className="flex items-center gap-4 text-base text-foreground"
            style={{ fontFamily: 'DM Sans' }}
          >
            <span>{cpf}</span>
            <span className="h-4 w-px bg-border" />
            <span>{email}</span>
            <span className="h-4 w-px bg-border" />
            <span>{telefone}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-[34px] px-3.5 gap-2 text-sm font-medium"
      >
        <FiEdit size={16} />
        Editar
      </Button>
    </div>
  );
}
