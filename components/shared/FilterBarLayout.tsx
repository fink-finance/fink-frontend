import { getFormattedDate } from '@/lib/utils/get-formatted-date';

type FilterBarLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function FilterBarLayout({
  title,
  subtitle,
  children,
}: FilterBarLayoutProps) {
  const date = new Date();
  const formattedDate = getFormattedDate(date);
  const displaySubtitle = subtitle ? `${subtitle}` : `${formattedDate}`;

  return (
    <div className='hidden md:block container py-8 w-full'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        {/* Saudação */}
        <div>
          <p className='text-md text-zinc-600 pb-2'>{displaySubtitle}</p>
          <h1 className='text-4xl font-semibold text-zinc-900'>{title}</h1>
        </div>

        {/* Filtros e ações */}
        <div className='flex items-center gap-6'>{children}</div>
      </div>
    </div>
  );
}
