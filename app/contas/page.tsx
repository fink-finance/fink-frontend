// 'use client';

// import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
// import { useRouter } from 'next/navigation';
// import { AccountsSection, ConnectAccountButton } from '@/components/contas';

// export default function ContasPage() {
//   const router = useRouter();

//   const activeAccounts = [
//     {
//       id: '1',
//       logo: '/images/banks/nubank.png',
//       name: 'Nu Pagamentos S.A.',
//       type: '2 contas | Ag. 0001',
//       cnpj: '12345678-9',
//       status: 'active' as const,
//       lastUpdate: '10/04/2023',
//     },
//     // ... mais contas
//   ];

//   const inactiveAccounts = [
//     // ... contas inativas
//   ];

//   return (
//     <ProtectedRoute>
//       <div className='bg-slate-50 min-h-screen'>
//         <div className='max-w-[1440px] mx-auto px-6 py-4 pb-32'>
//           {/* Header com botão voltar */}
//           <div className='flex items-center justify-between mb-6'>
//             <div className='flex items-center gap-4'>
//               <button
//                 onClick={() => router.back()}
//                 className='flex items-center gap-2 text-sm hover:opacity-70'
//               >
//                 ← Voltar
//               </button>
//               <div>
//                 <h1 className='text-2xl font-semibold' style={{ fontFamily: 'Bitter' }}>
//                   Minhas contas
//                 </h1>
//                 <p className='text-sm text-muted' style={{ fontFamily: 'DM Sans' }}>
//                   Todas as suas contas em um só lugar
//                 </p>
//               </div>
//             </div>
//             <ConnectAccountButton />
//           </div>

//           {/* Profile mini */}
//           <div className='mb-6'>
//             {/* Avatar + Nome + CPF */}
//           </div>

//           {/* Contas cadastradas */}
//           <AccountsSection 
//             title='Contas cadastradas'
//             count={activeAccounts.length}
//             accounts={activeAccounts}
//           />

//           {/* Contas inativas */}
//           <AccountsSection 
//             title='Contas inativas'
//             count={inactiveAccounts.length}
//             accounts={inactiveAccounts}
//             collapsed
//           />
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// app/contas/page.tsx
import { AccountsSection } from '@/components/contas';

export default function ContasPage() {
  return <AccountsSection />;
}
