import React from 'react';

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <div className='flex items-center gap-3 h-12'>
      <div className='w-10 h-10 rounded-full bg-[#EBFDFD] flex items-center justify-center flex-shrink-0'>
        {icon}
      </div>
      <div className='flex flex-col gap-0.5'>
        <p
          className='text-[14px] leading-[100%]'
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#6A7282',
          }}
        >
          {label}
        </p>
        <p
          className='text-base leading-tight text-foreground'
          style={{ fontFamily: 'DM Sans', fontWeight: 400 }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
