'use client';

import { DashboardCard } from '../shared/DashboardCard';
import PluggyButton from './PluggyButton';
import { usePluggyAccounts } from '@/lib/hooks/pluggy';
import type { PluggyAccount } from '@/lib/api/types/pluggy';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const PLUGGY_ITEM_ID = 'b1a3c84f-5a5b-4a26-abd4-ac39555506f4';

export const ContasCard = () => {
  const {
    data: accounts = [],
    isLoading,
    isError,
  } = usePluggyAccounts(PLUGGY_ITEM_ID);

  return (
    <DashboardCard
      title="Minhas contas"
      className="h-full"
      subtitle="Todas as suas contas em um só lugar"
    >
      {/* Conteúdo em coluna:
          - lista de contas ocupa o meio
          - botão fica colado embaixo à esquerda */}
      <div className="flex h-full flex-col justify-between">
        {/* LISTA DE CONTAS */}
        <div className="mt-4 flex-1 space-y-3 overflow-hidden">
          {isLoading && (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando contas...
            </div>
          )}

          {isError && !isLoading && (
            <div className="text-sm text-red-500">
              Não foi possível carregar suas contas agora.
            </div>
          )}

          {!isLoading && !isError && accounts.length === 0 && (
            <div className="text-sm text-slate-500">
              Nenhuma conta conectada ainda.
            </div>
          )}

          {!isLoading && !isError && accounts.length > 0 && (
            <ul className="space-y-3">
              {accounts.map((acc: PluggyAccount) => {
                const nameBase =
                  acc.institution?.name ?? acc.name ?? 'Conta';

                const isNubank =
                  nameBase.toLowerCase().includes('nu');

                return (
                  <li
                    key={acc.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar: se for Nubank, mostra logo; senão, iniciais */}
                      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-slate-900">
                        {isNubank ? (
                          <Image
                            src="/images/banks/nubank-logo.png"
                            alt="Nubank"
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-white">
                            {nameBase.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">
                          {nameBase}
                        </span>
                        {acc.type && (
                          <span className="text-xs text-slate-500">
                            {acc.type}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status simples */}
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {acc.status?.toLowerCase() === 'inactive'
                        ? 'Inativa'
                        : 'Ativa'}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* BOTÃO CONECTAR CONTA – embaixo à esquerda */}
        <div className="mt-4 flex items-center justify-end">
          <PluggyButton />
        </div>
      </div>
    </DashboardCard>
  );
};
