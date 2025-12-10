'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/lib/hooks/sessoes/use-auth';
import {
  ProfileHeader,
  ProfileDetails,
  SettingsSidebar,
  FinancialAssessment,
} from '@/components/profile';
import { FiCreditCard, FiBell, FiShield, FiHelpCircle } from 'react-icons/fi';
import {
  BsPerson,
  BsGeoAlt,
  BsSuitcaseLg,
  BsCashCoin,
  BsBook,
  BsHeart,
} from 'react-icons/bs';
import { getFormattedDate } from '@/lib/utils/get-formatted-date';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const userData = {
    nome: user?.nome || ' Gabriel Bezerra de Andrade',
    idade: 21,
    cpf: '120.919.084-28',
    email: 'gabrielbandrade@gmail.com',
    telefone: '+55 (81) 99144-2226',
    genero: 'Homem Cis',
    rendaMensal: 'R$ 1.000 – R$ 2.000',
    localizacao: 'Recife, PE',
    escolaridade: 'Ensino Superior Incompleto',
    ocupacao: 'Estagiário',
    estadoCivil: 'Solteiro (a)',
  };

  const profileLeftItems = [
    {
      icon: <BsPerson className='text-accent' size={20} />,
      label: 'Gênero',
      value: userData.genero,
    },
    {
      icon: <BsGeoAlt className='text-accent' size={20} />,
      label: 'Localização',
      value: userData.localizacao,
    },
    {
      icon: <BsSuitcaseLg className='text-accent' size={20} />,
      label: 'Ocupação',
      value: userData.ocupacao,
    },
  ];

  const profileRightItems = [
    {
      icon: <BsCashCoin className='text-accent' size={20} />,
      label: 'Renda mensal',
      value: userData.rendaMensal,
    },
    {
      icon: <BsBook className='text-accent' size={20} />,
      label: 'Escolaridade',
      value: userData.escolaridade,
    },
    {
      icon: <BsHeart className='text-accent' size={20} />,
      label: 'Estado civil',
      value: userData.estadoCivil,
    },
  ];

  const settingsItems = [
    {
      icon: <FiCreditCard className='text-[#808088]' size={20} />,
      title: 'Minhas contas',
      subtitle: 'Todas as suas contas em um só lugar',
      onClick: () => router.push('/contas'),
    },
    {
      icon: <FiBell className='text-[#808088]' size={20} />,
      title: 'Notificações e alertas',
      subtitle: 'Lembre-se sempre dos seus objetivos',
      onClick: () => router.push('/notificacoes'),
    },
    {
      icon: <FiShield className='text-[#808088]' size={20} />,
      title: 'Segurança',
      subtitle: 'Senhas, dados sensíveis e detalhes',
      onClick: () => router.push('/seguranca'),
    },
    {
      icon: <FiHelpCircle className='text-[#808088]' size={20} />,
      title: 'Ajuda',
      subtitle: 'Conte conosco para tirar suas dúvidas',
      onClick: () => router.push('/ajuda'),
    },
  ];

  const assessmentSteps = [
    { label: 'Crescimento', description: 'Investindo para futuro' },
    { label: 'Planejamento', description: 'Construindo reservas e metas' },
    { label: 'Organização', description: 'Controlando entradas e saídas' },
    {
      label: 'Descoberta',
      description: 'Conhecendo sua situação financeira',
      active: true,
    },
  ];

  const assessmentQuestions = [
    {
      title: 'Relação geral com o dinheiro',
      question: 'Como você classifica sua organização financeira?',
      answer: 'Desorganizada',
    },
    {
      title: 'Principal desafio',
      question: 'Qual a sua maior dificuldade financeira?',
      answer: 'Falta de disciplina',
    },
    {
      title: 'Hábito de poupança',
      question: 'Com que frequência você poupa?',
      answer: 'Raramente poupo',
    },
    {
      title: 'Interesse em investimentos',
      question: 'Qual a sua relação com investimentos?',
      answer: 'Tenho interesse, mas não sei como começar',
    },
    {
      title: 'Atitude financeira',
      question: 'Como você lida com dinheiro no dia a dia?',
      answer: 'Tento equilibrar poupança e gastos',
    },
  ];

  return (
    <ProtectedRoute>
      <div className='bg-slate-50'>
        <div className='max-w-[1440px] mx-auto px-6 py-4 pb-32'>
          <div className='mb-6'>
            <p
              className='text-base font-normal text-muted mb-1'
              style={{ fontFamily: 'DM Sans' }}
            >
              {getFormattedDate(new Date())}
            </p>
            <h1
              className='text-4xl font-medium text-foreground'
              style={{ fontFamily: 'Bitter' }}
            >
              Perfil Finker
            </h1>
          </div>

          <div className='flex flex-col lg:flex-row gap-6 items-start'>
            <div className='flex-1 space-y-6'>
              {/* Profile Card */}
              <Card className='bg-white shadow-sm p-6'>
                <ProfileHeader {...userData} />
                <div className='border-t border-border mb-6' />
                <ProfileDetails
                  leftItems={profileLeftItems}
                  rightItems={profileRightItems}
                />
              </Card>

              {/* Financial Assessment */}
              <FinancialAssessment
                steps={assessmentSteps}
                questions={assessmentQuestions}
              />
            </div>

            <div className='w-full lg:w-96'>
              <SettingsSidebar
                settingsItems={settingsItems}
                onLogout={logout}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
