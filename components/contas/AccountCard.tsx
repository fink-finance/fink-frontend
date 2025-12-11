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
  logoUrl?: string;
  logoInitials?: string; // fallback
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
  inactive: 'bg-slate-50 text-slate-500 border-slate-200',
};

export function AccountCard({ bank }: AccountCardProps) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-white px-6 py-6 shadow-sm">
      {/* Cabeçalho */}
      <header className="flex items-center gap-3">
        {/* LOGO */}
        <div
          className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ${bank.logoBgClass}`}
        >
          {bank.logoUrl ? (
            <Image
              src={bank.logoUrl}
              width={44}
              height={44}
              alt={bank.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">
              {bank.logoInitials}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-900">
            {bank.name}
          </span>
          <span className="text-base text-slate-600">
            {bank.totalAccounts} conta
            {bank.totalAccounts > 1 ? 's' : ''} • Ag. {bank.branch}
          </span>
        </div>
      </header>

      {/* Contas do banco */}
      <div className="flex flex-col gap-3 md:flex-row">
        {bank.accounts.map((account) => (
          <div
            key={account.id}
            className="flex min-w-[260px] flex-1 items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-5 py-4"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-lg font-medium text-slate-900">
                <span>{account.number}</span>
                {account.favorite && (
                  <span className="text-sm text-blue-500">★</span>
                )}
              </div>
              <span className="text-base text-slate-600">
                {account.type}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-semibold ${statusStyles[account.status]}`}
              >
                {account.status === 'active' ? 'Ativa' : 'Inativa'}
              </span>
              <button className="rounded-full p-2 hover:bg-slate-100">
                <MoreHorizontal className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
