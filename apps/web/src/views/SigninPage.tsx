'use client';

import { useRouter } from 'next/navigation';

import SigninForm from '@/components/auth/signin-form';
import { signInAction } from '@/lib/actions/auth.action';
import { SigninFormData } from '@/lib/types/auth';

const SigninPage = () => {
  const router = useRouter();

  const handleLogin = async (data: SigninFormData) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const result = await signInAction(formData);

      // 성공 시 홈페이지로 이동
      if (result && result.success) {
        router.push('/');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <SigninForm onLogin={handleLogin} />
    </div>
  );
};

export default SigninPage;
