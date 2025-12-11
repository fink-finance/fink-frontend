// ProfileItem.tsx
import React from 'react';

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex h-12 items-center gap-3">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#EBFDFD]">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium tracking-tight text-slate-500">
          {label}
        </p>
        <p className="text-base font-medium leading-tight text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}
