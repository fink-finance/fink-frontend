'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { AccountCard, Bank } from './AccountCard';
import { usePluggyAccounts } from '@/lib/hooks/pluggy';
import type { PluggyAccount } from '@/lib/api/types/pluggy';

const PLUGGY_ITEM_ID = 'b1a3c84f-5a5b-4a26-abd4-ac39555506f4';

// Agrupa contas reais por banco e define logo/imagem
function groupAccountsByBank(accounts: PluggyAccount[]): Bank[] {
  const map = new Map<string, Bank>();

  accounts.forEach((acc) => {
    const bankName = acc.institution?.name ?? acc.name ?? 'Conta';
    const bankId =
      acc.institution?.id?.toString() ??
      bankName.toLowerCase().replace(/\s+/g, '-');

    // Detecta Nubank
    const lower = bankName.toLowerCase();
    const isNubank = lower.includes('nubank') || lower.startsWith('nu ');

    let bank = map.get(bankId);

    if (!bank) {
      const initials = bankName.slice(0, 2).toUpperCase();

      bank = {
        id: bankId,
        name: bankName,
        logoUrl: isNubank ? '/images/banks/nubank-logo.png' : undefined,
        logoInitials: isNubank ? undefined : initials,
        logoBgClass: isNubank ? 'bg-[#8A05BE]' : 'bg-slate-900',
        branch: '0001',
        totalAccounts: 0,
        accounts: [],
      };

      map.set(bankId, bank);
    }

    const status: 'active' | 'inactive' =
      acc.status?.toLowerCase() === 'inactive' ? 'inactive' : 'active';

    const raw = (acc as any).number ?? (acc as any).accountNumber;
    const displayNumber =
      typeof raw === 'string' && raw.length > 0
        ? raw
        : `Conta ${bank.accounts.length + 1}`;

    bank.accounts.push({
      id: String(acc.id),
      number: displayNumber,
      type: acc.type ?? 'Conta',
      status,
    });

    bank.totalAccounts += 1;
  });

  return Array.from(map.values());
}

export function AccountsSection() {
  const {
    data: accounts = [],
    isLoading,
    isError,
  } = usePluggyAccounts(PLUGGY_ITEM_ID);

  const banks = React.useMemo(() => groupAccountsByBank(accounts), [accounts]);

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(
    (acc) => acc.status?.toLowerCase() !== 'inactive'
  );
  const inactiveAccounts = accounts.filter(
    (acc) => acc.status?.toLowerCase() === 'inactive'
  );

  return (
    <div className='min-h-screen bg-[#F5F7F9]'>
      <div className='max-w-6xl mx-auto px-6 py-8 space-y-6'>
        {/* Topo */}
        <div className='flex items-center justify-between gap-4'>
          <Link
            href='/profile'
            className='inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800'
          >
            <ArrowLeft className='w-4 h-4' />
            Voltar
          </Link>

          <div className='flex-1'>
            <h1 className='text-xl font-semibold text-gray-900'>
              Minhas contas
            </h1>
            <p className='text-sm text-gray-500'>
              Todas as suas contas em um só lugar
            </p>
          </div>

          <button className='inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-blue-700'>
            Nova conta
          </button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className='mt-8 flex items-center justify-center text-sm text-slate-500'>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Carregando contas...
          </div>
        )}

        {/* Erro */}
        {isError && !isLoading && (
          <div className='mt-8 text-sm text-red-500'>
            Não foi possível carregar suas contas agora.
          </div>
        )}

        {/* Conteúdo */}
        {!isLoading && !isError && (
          <div className='flex flex-col lg:flex-row gap-6 items-start'>
            {/* Painel lateral */}
            <aside className='w-full lg:w-80 rounded-3xl bg-white border border-gray-100 shadow-sm px-6 py-6 flex flex-col gap-5'>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200 overflow-hidden' />
                <div>
                  <p className='text-sm font-semibold text-gray-900'>
                    Gabriel Bezerra de Andrade
                  </p>
                  <p className='text-xs text-gray-500'>120.919.084-28</p>
                </div>
              </div>

              <div className='flex items-center justify-between text-xs text-gray-500'>
                <span>Contas cadastradas</span>
                <span className='font-medium text-gray-900'>
                  {totalAccounts} conta{totalAccounts === 1 ? '' : 's'}
                </span>
              </div>

              {/* Ativas */}
              <section className='border-t border-gray-100 pt-4 space-y-3'>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[11px] text-blue-500'>
                      ✦
                    </div>
                    <span>Contas ativas</span>
                  </div>
                  <span className='font-medium text-gray-900'>
                    {activeAccounts.length} conta
                    {activeAccounts.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className='space-y-2 text-xs'>
                  {activeAccounts.slice(0, 3).map((acc) => (
                    <div key={acc.id} className='flex justify-between'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {acc.institution?.name ?? acc.name ?? 'Conta'}
                        </p>
                        <p className='text-gray-500'>{acc.type ?? 'Conta'}</p>
                      </div>
                    </div>
                  ))}
                  {activeAccounts.length === 0 && (
                    <p className='text-gray-400'>Nenhuma conta ativa.</p>
                  )}
                </div>
              </section>

              {/* Inativas */}
              <section className='border-t border-gray-100 pt-4 space-y-3'>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[11px] text-gray-500'>
                      ⏻
                    </div>
                    <span>Contas inativas</span>
                  </div>
                  <span className='font-medium text-gray-900'>
                    {inactiveAccounts.length} conta
                    {inactiveAccounts.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className='space-y-2 text-xs'>
                  {inactiveAccounts.slice(0, 3).map((acc) => (
                    <div key={acc.id} className='flex justify-between'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {acc.institution?.name ?? acc.name ?? 'Conta'}
                        </p>
                        <p className='text-gray-500'>{acc.type ?? 'Conta'}</p>
                      </div>
                    </div>
                  ))}
                  {inactiveAccounts.length === 0 && (
                    <p className='text-gray-400'>Nenhuma conta inativa.</p>
                  )}
                </div>
              </section>
            </aside>

            {/* Lista de bancos e cartões */}
            <main className='flex-1 space-y-4 w-full'>
              {banks.length === 0 && (
                <div className='text-sm text-slate-500'>
                  Nenhuma conta conectada ainda.
                </div>
              )}

              {banks.map((bank) => (
                <AccountCard key={bank.id} bank={bank} />
              ))}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
