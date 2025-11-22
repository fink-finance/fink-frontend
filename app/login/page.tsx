import { LoginForm } from '@/components/auth/LoginForm';
import { MainLogo } from '@/components/shared/MainLogo';

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='flex justify-center mb-8'>
          <MainLogo />
        </div>

        {/* Card do formulário */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
