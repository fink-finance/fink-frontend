import React from 'react';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';

type AccountStatus = 'active' | 'inactive';

export type BankAccount = {
  id: string;
  number: string;
  type: string;
  status: AccountStatus;
  favorite?: boolean;
};

export type Bank = {
  id: string;
  name: string;
  logoUrl?: string; // ← ADICIONADO
  logoInitials?: string; // ← fallback
  logoBgClass: string;
  branch: string;
  totalAccounts: number;
  accounts: BankAccount[];
};

type AccountCardProps = {
  bank: Bank;
};

const statusStyles: Record<AccountStatus, string> = {
  active: 'bg-blue-50 text-blue-600 border-blue-100',
  inactive: 'bg-gray-50 text-gray-500 border-gray-200',
};

export function AccountCard({ bank }: AccountCardProps) {
  return (
    <section className='rounded-3xl bg-white border border-gray-100 shadow-sm px-6 py-5 flex flex-col gap-4'>
      {/* Cabeçalho */}
      <header className='flex items-center gap-3'>
        {/* LOGO */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden ${bank.logoBgClass}`}
        >
          {bank.logoUrl ? (
            <Image src={bank.logoUrl} width={32} height={32} alt={bank.name} />
          ) : (
            <span className='text-xs font-semibold text-white'>
              {bank.logoInitials}
            </span>
          )}
        </div>

        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-gray-900'>
            {bank.name}
          </span>
          <span className='text-xs text-gray-500'>
            {bank.totalAccounts} conta{bank.totalAccounts > 1 ? 's' : ''} | Ag.{' '}
            {bank.branch}
          </span>
        </div>
      </header>

      {/* Contas do banco */}
      <div className='flex flex-col md:flex-row gap-3'>
        {bank.accounts.map((account) => (
          <div
            key={account.id}
            className='flex-1 min-w-[220px] rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3 flex items-center justify-between gap-3'
          >
            <div className='flex flex-col'>
              <div className='flex items-center gap-1 text-sm font-medium text-gray-900'>
                <span>{account.number}</span>
                {account.favorite && (
                  <span className='text-xs text-blue-500'>★</span>
                )}
              </div>
              <span className='text-xs text-gray-500'>{account.type}</span>
            </div>

            <div className='flex items-center gap-2'>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${statusStyles[account.status]}`}
              >
                {account.status === 'active' ? 'Ativa' : 'Inativa'}
              </span>
              <button className='p-1.5 rounded-full hover:bg-gray-100'>
                <MoreHorizontal className='w-4 h-4 text-gray-500' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
