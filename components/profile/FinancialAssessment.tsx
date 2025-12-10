import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface AssessmentQuestion {
  title: string;
  question: string;
  answer: string;
}

interface AssessmentStep {
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
    <Card className='bg-white shadow-sm p-6'>
      {/* Header */}
      <h3
        className='text-[20px] leading-[100%] mb-1'
        style={{ fontFamily: 'Bitter', fontWeight: 600, color: '#000000' }}
      >
        Avaliações financeiras
      </h3>
      <p
        className='text-base leading-[100%] mb-6'
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 400,
          color: '#808088',
        }}
      >
        Suas características e relação com o dinheiro ao longo do tempo
      </p>

      {/* Date picker + Tab buttons */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-8'>
        {/* Date input */}
        <div className='relative'>
          <input
            type='text'
            value={date}
            readOnly
            className='w-full sm:w-auto h-11 px-4 pl-10 border border-[#E7EBEE] rounded-lg text-sm bg-white'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#808088',
            }}
          />
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4'
            style={{ color: '#808088' }}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            strokeWidth='2'
          >
            <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
            <line x1='16' y1='2' x2='16' y2='6' />
            <line x1='8' y1='2' x2='8' y2='6' />
            <line x1='3' y1='10' x2='21' y2='10' />
          </svg>
        </div>

        {/* Tab buttons */}
        <div className='flex flex-wrap gap-2'>
          <TabButton active={activeTab === 'last'}>Última avaliação</TabButton>
          <TabButton active={activeTab === 'penultimate'}>
            Penúltima avaliação
          </TabButton>
          <TabButton active={activeTab === 'first'}>
            Primeira avaliação
          </TabButton>
        </div>
      </div>

      {/* Main content - Dashboard + Steps | Questions */}
      <div className='flex gap-6'>
        {/* Left: Dashboard + Steps */}
        <div className='flex flex-col gap-6'>
          {/* Dashboard Image - 310.41px × 222px */}
          <div className='w-[310.41px] h-[222px] flex-shrink-0'>
            <Image
              src='/images/profile/dashboard.png'
              alt='Dashboard de avaliação financeira'
              width={310}
              height={222}
              className='w-full h-full object-contain'
              priority
            />
          </div>

          {/* Steps - 292px × 322px, Gap 8px */}
          <div className='w-[292px] h-[322px] flex-shrink-0 relative'>
            {/* Vertical connecting line - Height 40px between steps */}
            <div className='absolute left-[11px] top-[34px] bottom-[34px] w-[1px] bg-[#E7EBEE]' />

            <div className='space-y-2 relative'>
              {steps.map((step, index) => (
                <StepItem key={index} {...step} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Questions */}
        <div className='flex-1 space-y-4'>
          {questions.map((question, index) => (
            <QuestionCard key={index} {...question} />
          ))}
        </div>
      </div>
    </Card>
  );
}

// Tab Button Component
function TabButton({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`h-8 px-4 rounded-full text-sm transition-colors border ${
        active
          ? 'bg-primary text-white border-primary'
          : 'bg-white border-[#E7EBEE] hover:bg-gray-50'
      }`}
      style={{
        fontFamily: 'DM Sans',
        fontWeight: 400,
        color: active ? '#FFFFFF' : '#808088',
      }}
    >
      {children}
    </button>
  );
}

// Step Item Component - 292px × 68px, Gap 4px
function StepItem({ label, description, active = false }: AssessmentStep) {
  return (
    <div className='w-[292px] h-[68px] flex items-start gap-1 relative'>
      <div className='flex-shrink-0'>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 relative z-10 ${
            active ? 'bg-primary border-primary' : 'bg-white border-[#D1D2D9]'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              active ? 'bg-white' : 'bg-[#D1D2D9]'
            }`}
          />
        </div>
      </div>
      <div className='flex-1'>
        <p
          className='text-base leading-[100%] mb-1'
          style={{
            fontFamily: 'Bitter',
            fontWeight: 700,
            color: active ? '#0055FF' : '#808088',
          }}
        >
          {label}
        </p>
        <p
          className='text-sm leading-[100%]'
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 400,
            color: '#808088',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// Question Card Component
function QuestionCard({ title, question, answer }: AssessmentQuestion) {
  return (
    <div className='h-[106px] border border-[#E7EBEE] rounded-xl p-4 bg-white flex flex-col gap-3'>
      <p
        className='text-sm leading-[100%]'
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 400,
          color: '#808088',
        }}
      >
        {title}
      </p>
      <p
        className='text-sm leading-[100%]'
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 400,
          color: '#000000',
        }}
      >
        {question}
      </p>
      <p
        className='text-base leading-[100%]'
        style={{
          fontFamily: 'DM Sans',
          fontWeight: 600,
          color: '#000000',
          letterSpacing: '-0.02em',
        }}
      >
        {answer}
      </p>
    </div>
  );
}
