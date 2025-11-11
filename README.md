# 💰 Fink - Frontend

Sistema de controle financeiro pessoal construído com Next.js 16, React 19 e TypeScript.

---

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- pnpm (recomendado) ou npm

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/fink-finance/fink-frontend.git
cd fink-frontend

# Instalar dependências
pnpm install
```

### Executar em desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para produção

```bash
# Criar build otimizado
pnpm build

# Executar build de produção
pnpm start
```

---

## 📁 Arquitetura do Projeto

```
fink-frontend/
├── app/                          # App Router do Next.js 16
│   ├── layout.tsx                # Layout raiz (providers globais)
│   ├── page.tsx                  # Página raiz (redireciona para /home)
│   ├── providers.tsx             # React Query provider
│   ├── globals.css               # Estilos globais + Tailwind
│   └── home/                     # Rota /home (dashboard)
│       ├── layout.tsx            # Layout com Header
│       └── page.tsx              # Página principal do dashboard
│
├── components/                   # Componentes React
│   ├── Header.tsx                # Header global (navegação principal)
│   ├── ui/                       # Componentes shadcn/ui (Button, Input, etc)
│   ├── shared/                   # Componentes reutilizáveis custom
│   └── home/                     # Componentes específicos da home
│       └── FilterBar.tsx         # Barra de filtros e saudação
│
├── lib/                          # Bibliotecas e utilitários
│   ├── utils.ts                  # Função cn() para classes CSS
│   ├── utils/                    # Funções auxiliares (datas, moeda, etc)
│   ├── hooks/                    # Custom React hooks
│   ├── constants/                # Constantes da aplicação
│   └── query/
│       └── client.ts             # Cliente do React Query
│
├── public/                       # Assets estáticos
├── tailwind.config.ts            # Configuração do Tailwind CSS v3
├── components.json               # Configuração do shadcn/ui
└── tsconfig.json                 # Configuração do TypeScript
```

---

## 🛠️ Stack Tecnológica

### Core

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript 5** - Tipagem estática

### UI & Styling

- **Tailwind CSS v3** - Framework CSS utilitário
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Radix UI** - Primitivos de UI (usado pelo shadcn)
- **class-variance-authority** - Gerenciamento de variantes de componentes
- **Lucide React** - Ícones

### State & Data Fetching

- **React Query (TanStack Query)** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado cliente (se necessário)

### Forms & Validation

- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### Outros

- **Recharts** - Gráficos e visualizações
- **Framer Motion** - Animações
- **Clerk** - Autenticação (se configurado)

---

## 📂 Convenções de Organização

### Componentes

#### `components/ui/`

- Componentes do **shadcn/ui** instalados via CLI
- Não editar manualmente a menos que necessário
- Exemplo: Button, Input, Card

#### `components/shared/`

- Componentes **reutilizáveis custom** que você cria
- Usados em múltiplas páginas/features
- Exemplo: LoadingSpinner, EmptyState, DataCard

#### `components/[feature]/`

- Componentes **específicos** de uma feature/página
- Não devem ser importados fora da feature
- Exemplo: `home/FilterBar.tsx`, `gastos/GastosTable.tsx`

#### `components/Header.tsx`

- Componentes de **layout global**
- Exemplo: Header, Footer, Sidebar

### Utilitários

#### `lib/utils.ts`

- Função `cn()` para combinar classes CSS do Tailwind

#### `lib/utils/`

- Funções auxiliares organizadas por categoria
- Exemplo: `date.ts`, `currency.ts`, `validators.ts`

#### `lib/hooks/`

- Custom React hooks
- Exemplo: `useDebounce.ts`, `useLocalStorage.ts`

#### `lib/constants/`

- Constantes e configurações da aplicação

---

## 🎨 Sistema de Design

### Cores

As cores são definidas via CSS variables em `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Azul principal */
  --secondary: 210 40% 96.1%; /* Cinza claro */
  --accent: 210 40% 96.1%; /* Cor de destaque */
  --destructive: 0 84.2% 60.2%; /* Vermelho para ações destrutivas */
  /* ... outras cores */
}
```

### Componentes shadcn/ui

Para adicionar novos componentes:

```bash
pnpm dlx shadcn@latest add [component-name]

# Exemplos:
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
```

---

## 🔄 Fluxo de Dados

```
1. Usuário interage com a UI
   ↓
2. Componente dispara ação (ex: buscar dados)
   ↓
3. React Query gerencia a requisição HTTP
   ↓
4. Backend (API) processa e retorna dados
   ↓
5. React Query cacheia e atualiza o estado
   ↓
6. Componente re-renderiza com novos dados
```

### Gerenciamento de Estado

- **Estado servidor**: React Query (dados da API, cache, refetch)
- **Estado cliente**: Zustand (preferências, UI state)
- **Estado local**: useState, useReducer (estado de formulários, modals)

---

## 📝 Padrões de Código

### Nomenclatura

- **Componentes**: PascalCase (`Header.tsx`, `FilterBar.tsx`)
- **Funções/variáveis**: camelCase (`formatDate`, `userName`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRY`)
- **Arquivos de util**: kebab-case ou camelCase (`date.ts`, `currency.ts`)

### Estrutura de Componente

```tsx
'use client' // Se necessário (interatividade, hooks)

import { ... } from '...'

interface ComponentProps {
  // Props tipadas
}

export function Component({ ...props }: ComponentProps) {
  // Hooks no topo
  // Lógica
  // JSX no return

  return (
    <div>
      {/* Componente */}
    </div>
  )
}
```

### Importações

```tsx
// 1. Bibliotecas externas
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Componentes internos
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

// 3. Utils e constantes
import { formatDate } from '@/lib/utils/date';
import { API_URL } from '@/lib/constants';

// 4. Tipos
import type { User } from '@/types';
```

---

## 🧪 Testing (Futuro)

```bash
# Testes unitários (quando configurado)
pnpm test

# Testes E2E (quando configurado)
pnpm test:e2e
```

---

## 🚢 Deploy

### Vercel (Recomendado)

O projeto está otimizado para deploy na Vercel:

1. Conecte o repositório no dashboard da Vercel
2. Configure variáveis de ambiente (se necessário)
3. Deploy automático a cada push na branch `main`

### Outras plataformas

O build estático pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000

# Clerk (se usar)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
2. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request

### Commits Convencionais

- `feat:` Nova feature
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📄 Licença

Este projeto é privado e pertence à equipe Fink Finance.

---

## 📞 Contato

- **Repositório**: [github.com/fink-finance/fink-frontend](https://github.com/fink-finance/fink-frontend)
- **Issues**: [github.com/fink-finance/fink-frontend/issues](https://github.com/fink-finance/fink-frontend/issues)
