// SettingsItem.tsx
import { FiChevronRight } from 'react-icons/fi';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function SettingsItem({
  icon,
  title,
  subtitle,
  onClick,
}: SettingsItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border border-[#E7EBEE] p-4 text-left transition-colors hover:bg-slate-50"
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#E7EBEE]">
        <FiChevronRight className="text-slate-500" size={18} />
      </div>
    </button>
  );
}
