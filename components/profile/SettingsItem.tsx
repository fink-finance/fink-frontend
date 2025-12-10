import { FiChevronRight } from 'react-icons/fi';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function SettingsItem({ icon, title, subtitle }: SettingsItemProps) {
  return (
    <button className='w-full flex items-center justify-between p-4 rounded-lg border border-[#E7EBEE] hover:bg-slate-50 transition-colors text-left'>
      <div className='flex items-center gap-3'>
        {icon}
        <div className='flex flex-col gap-1'>
          <p
            className='text-base leading-tight'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 600,
              color: '#000000',
            }}
          >
            {title}
          </p>
          <p
            className='text-sm leading-tight'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#808088',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <div className='w-8 h-8 flex items-center justify-center rounded-lg border border-[#E7EBEE] flex-shrink-0'>
        <FiChevronRight className='text-[#808088]' size={16} />
      </div>
    </button>
  );
}
