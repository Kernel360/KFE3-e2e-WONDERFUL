import React, { useState } from 'react';

import AuthForm from '@/components/auth/AuthForm';
import BottomModal from '@/components/auth/Bottommodal';
import LocationSetup from '@/components/auth/LocationSetup';
import StartInfo from '@/components/auth/StartInfo';

import { SignupFormData } from '@/types/auth';

interface SignupProps {
  onToggleToSignin?: () => void;
  onLocationComplete?: () => void;
}

const Signup = ({ onToggleToSignin, onLocationComplete }: SignupProps) => {
  const [currentStep, setCurrentStep] = useState<'signup' | 'modal' | 'location' | 'start'>(
    'location'
  );

  const handleSignup = (data: SignupFormData) => {
    // 회원가입 API 호출
    console.log('회원가입 데이터:', data);

    // 성공 시 모달 표시
    setCurrentStep('modal');
  };

  const handleToggleToSignin = () => {
    console.log('로그인 페이지로 이동');
    onToggleToSignin?.();
  };

  const handleGoToLocation = () => {
    console.log('위치 설정 페이지로 이동');
    setCurrentStep('location');
  };

  const handleCloseModal = () => {
    setCurrentStep('signup');
  };

  const handleSaveLocation = () => {
    console.log('위치 저장 완료');
    // 위치 저장 API 호출
    onLocationComplete?.();
  };

  const handleSkipLocation = () => {
    console.log('위치 설정 건너뛰기');
    // StartInfo 화면으로 이동
    setCurrentStep('start');
  };

  const handleStartActivity = () => {
    console.log('활동 시작');
    // 메인 페이지로 이동
    onLocationComplete?.();
  };

  // 활동 시작 화면
  if (currentStep === 'start') {
    return <StartInfo onStartActivity={handleStartActivity} />;
  }

  // 위치 설정 화면
  if (currentStep === 'location') {
    return (
      <LocationSetup onSaveLocation={handleSaveLocation} onSkipLocation={handleSkipLocation} />
    );
  }

  // 회원가입 화면
  return (
    <>
      <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-[154px] pt-[131px]">
        {/* 회원가입 제목 */}
        <h1
          className="whitespace-nowrap text-center"
          style={{
            color: 'var(--color-neutral-900)',
            fontSize: 'var(--text-h3)',
            fontStyle: 'normal',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--line-height-h3)',
          }}
        >
          회원 가입
        </h1>

        {/* 회원가입 폼 */}
        <div className="mt-[80px]">
          <AuthForm<SignupFormData>
            formType="signup"
            onSubmit={handleSignup}
            onToggleForm={handleToggleToSignin}
          />
        </div>
      </div>

      {/* 성공 모달 */}
      <BottomModal
        isOpen={currentStep === 'modal'}
        onClose={handleCloseModal}
        onGoToLogin={handleGoToLocation}
      />
    </>
  );
};

export default Signup;
