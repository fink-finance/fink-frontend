'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export interface AssessmentQuestion {
  title: string;
  question: string;
  answer: string;
}

export interface AssessmentStep {
  label: string;
  description: string;
  active?: boolean;
}

interface FinancialAssessmentProps {
  date?: string;
  activeTab?: 'last' | 'penultimate' | 'first';
  questions: AssessmentQuestion[];
  steps: AssessmentStep[];
}

export function FinancialAssessment({
  date = '00/00/0000',
  activeTab = 'last',
  questions,
  steps,
}: FinancialAssessmentProps) {
  return (
    <Card className="bg-white p-7 shadow-sm">
      {/* Header */}
      <h3 className="mb-1 text-2xl font-semibold text-slate-900">
        Avaliações financeiras
      </h3>
      <p className="mb-6 text-base text-slate-600">
        Suas características e relação com o dinheiro ao longo do tempo
      </p>

      {/* Layout principal */}
      <div className="flex items-start gap-40">
        {/* COLUNA ESQUERDA */}
        <div className="flex flex-col gap-6">
          {/* Data */}
          <div className="relative w-[240px]">
            <input
              type="text"
              value={date}
              readOnly
              className="h-11 w-full rounded-lg border border-[#E7EBEE] bg-white px-4 pl-10 text-sm text-slate-600"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>

          {/* Radar estático */}
          <div className="h-[240px] w-[320px] flex-shrink-0">
            <Image
              src="/images/profile/dashboard.png"
              alt="Dashboard de avaliação financeira"
              width={320}
              height={240}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          {/* Etapas */}
          <div className="relative h-[322px] w-[292px] flex-shrink-0">
            <div className="absolute left-[11px] top-[34px] bottom-[34px] w-px bg-[#E7EBEE]" />
            <div className="relative space-y-3">
              {steps.map((step, index) => (
                <StepItem key={index} {...step} />
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA – abas + perguntas */}
        <div className="flex flex-1 flex-col gap-4">
          {/* Abas */}
          <div className="flex flex-wrap gap-2">
            <TabButton active={activeTab === 'last'}>
              Última avaliação
            </TabButton>
            <TabButton active={activeTab === 'penultimate'}>
              Penúltima avaliação
            </TabButton>
            <TabButton active={activeTab === 'first'}>
              Primeira avaliação
            </TabButton>
          </div>

          {/* Perguntas */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <QuestionCard key={index} {...question} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ----------------- Componentes auxiliares ----------------- */

interface TabButtonProps {
  active: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, children }) => {
  return (
    <button
      className={`h-9 rounded-full border px-5 text-sm font-medium transition-colors ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-[#E7EBEE] bg-white text-slate-600 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
};

type StepItemProps = AssessmentStep;

const StepItem: React.FC<StepItemProps> = ({
  label,
  description,
  active = false,
}) => {
  return (
    <div className="flex h-[72px] w-[292px] items-start gap-2">
      <div className="flex-shrink-0">
        <div
          className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 ${
            active ? 'border-primary bg-primary' : 'border-[#D1D2D9] bg-white'
          }`}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              active ? 'bg-white' : 'bg-[#D1D2D9]'
            }`}
          />
        </div>
      </div>
      <div className="flex-1">
        <p
          className={`mb-1 text-sm font-semibold ${
            active ? 'text-blue-600' : 'text-slate-700'
          }`}
        >
          {label}
        </p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
};

type QuestionCardProps = AssessmentQuestion;

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  question,
  answer,
}) => {
  return (
    <div className="flex h-[120px] flex-col gap-3 rounded-xl border border-[#E7EBEE] bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <p className="text-sm text-slate-900">{question}</p>
      <p className="text-base font-semibold text-slate-900">{answer}</p>
    </div>
  );
};
