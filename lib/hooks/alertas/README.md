# Hooks de Alertas

Hooks React Query para gerenciar alertas do usuário autenticado.

## Estrutura

```
lib/hooks/alertas/
├── index.ts                 # Barrel export principal
├── queries/
│   ├── index.ts            # Export das queries
│   └── use-alertas.ts      # Hook para listar alertas
└── mutations/
    ├── index.ts            # Export das mutations
    └── use-mark-alerta-as-read.ts  # Hook para marcar como lido
```

## Tipos

### Alerta

```typescript
interface Alerta {
  id_alerta: number;
  fk_pessoa_id_pessoa: string;
  data: string; // ISO 8601 format
  conteudo: string;
  lida: boolean;
}
```

## Queries

### `useAlertas(lida?: boolean)`

Lista todos os alertas do usuário autenticado.

```typescript
import { useAlertas } from '@/lib/hooks/alertas';

function AlertasComponent() {
  const { data: alertas, isLoading, error } = useAlertas();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar alertas</div>;

  return (
    <div>
      {alertas?.map(alerta => (
        <div key={alerta.id_alerta}>
          <p>{alerta.conteudo}</p>
          <small>{new Date(alerta.data).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
```

### `useAlertasNaoLidos()`

Alias para listar apenas alertas não lidos (lida = false).

```typescript
import { useAlertasNaoLidos } from '@/lib/hooks/alertas';

function NotificationsIcon() {
  const { data: alertasNaoLidos } = useAlertasNaoLidos();
  const count = alertasNaoLidos?.length || 0;

  return (
    <div className="relative">
      <BellIcon />
      {count > 0 && (
        <span className="badge">{count}</span>
      )}
    </div>
  );
}
```

## Mutations

### `useMarkAlertaAsRead()`

Marca um alerta como lido (ou não lido).

```typescript
import { useMarkAlertaAsRead } from '@/lib/hooks/alertas';

function AlertaItem({ alerta }: { alerta: Alerta }) {
  const markAsRead = useMarkAlertaAsRead();

  const handleMarkAsRead = () => {
    markAsRead.mutate(
      { id: alerta.id_alerta, lida: true },
      {
        onSuccess: () => {
          console.log('Alerta marcado como lido!');
        },
        onError: (error) => {
          console.error('Erro:', error);
        }
      }
    );
  };

  return (
    <div className={alerta.lida ? 'opacity-50' : ''}>
      <p>{alerta.conteudo}</p>
      {!alerta.lida && (
        <button onClick={handleMarkAsRead}>
          Marcar como lido
        </button>
      )}
    </div>
  );
}
```

## Configurações de Cache

- **staleTime**: 1 minuto (alertas devem ser relativamente frescos)
- **gcTime**: 5 minutos
- **refetchInterval**: 2 minutos (refetch automático para manter alertas atualizados)

## Query Keys

```typescript
alertasKeys = {
  all: ['alertas'],
  lists: () => ['alertas', 'list'],
  list: (lida?: boolean) => ['alertas', 'list', { lida }],
  details: () => ['alertas', 'detail'],
  detail: (id: number) => ['alertas', 'detail', id],
};
```

## Endpoints Utilizados

- **GET** `/api/v1/alertas/` - Lista alertas não lidos
- **PATCH** `/api/v1/alertas/{id_alerta}` - Marca alerta como lido

## Exemplo Completo

```typescript
import { useAlertasNaoLidos, useMarkAlertaAsRead } from '@/lib/hooks/alertas';

function AlertasList() {
  const { data: alertas, isLoading } = useAlertasNaoLidos();
  const markAsRead = useMarkAlertaAsRead();

  const handleMarkAsRead = (id: number) => {
    markAsRead.mutate({ id, lida: true });
  };

  if (isLoading) return <SpinLoader />;

  return (
    <div className="space-y-2">
      {alertas?.length === 0 ? (
        <p>Nenhum alerta não lido</p>
      ) : (
        alertas?.map(alerta => (
          <div
            key={alerta.id_alerta}
            className="p-4 border rounded"
          >
            <p className="font-medium">{alerta.conteudo}</p>
            <div className="flex justify-between items-center mt-2">
              <small className="text-gray-500">
                {new Date(alerta.data).toLocaleDateString('pt-BR')}
              </small>
              <button
                onClick={() => handleMarkAsRead(alerta.id_alerta)}
                className="text-sm text-blue-600"
                disabled={markAsRead.isPending}
              >
                Marcar como lido
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
```

## Invalidação de Cache

Quando um alerta é marcado como lido, o hook automaticamente:

1. Remove o alerta da lista de não lidos
2. Atualiza o cache de detalhes do alerta
3. Atualiza a lista geral de alertas
4. Invalida as queries relacionadas para garantir sincronização
