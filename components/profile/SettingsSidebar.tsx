import { Card } from '@/components/ui/card';
import { SettingsItem } from './SettingsItem';
import { FiRefreshCw, FiLogOut } from 'react-icons/fi';

interface SettingsSidebarProps {
  settingsItems: Array<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  }>;
  onLogout: () => void;
}

export function SettingsSidebar({
  settingsItems,
  onLogout,
}: SettingsSidebarProps) {
  return (
    <div className='space-y-6'>
      <Card className='bg-white shadow-sm p-6'>
        <div className='mb-6'>
          <h3
            className='text-[20px] mb-1'
            style={{
              fontFamily: 'Bitter',
              fontWeight: 600,
              color: '#000000',
            }}
          >
            Configurações
          </h3>
          <p
            className='text-base'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#808088',
            }}
          >
            Personalize sua gestão financeira
          </p>
        </div>

        <div className='space-y-3'>
          {settingsItems.map((item) => (
            <SettingsItem key={item.title} {...item} />
          ))}
        </div>
      </Card>

      <Card className='bg-white shadow-sm p-6'>
        <button className='w-full flex items-center gap-3 text-left hover:opacity-70 transition-opacity py-2'>
          <FiRefreshCw className='text-[#000000]' size={20} />
          <span
            className='text-base'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#000000',
            }}
          >
            Trocar de conta
          </span>
        </button>

        <div className='border-t border-[#E7EBEE] my-4' />

        <button
          onClick={onLogout}
          className='w-full flex items-center gap-3 text-left hover:opacity-70 transition-opacity py-2'
        >
          <FiLogOut className='text-destructive' size={20} />
          <span
            className='text-base'
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'hsl(var(--destructive))',
            }}
          >
            Sair
          </span>
        </button>
      </Card>
    </div>
  );
}
