'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import BottomModal from '@/components/auth/bottom-modal';
import LocationSetup from '@/components/auth/location-setup';
import SignupDone from '@/components/auth/signup-done';
import SignupForm from '@/components/auth/signup-form';

import { SignupFormData } from '@/lib/types/auth';

interface SignupProps {
  onLocationComplete?: () => void;
}

const Signup = ({ onLocationComplete }: SignupProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'signup' | 'modal' | 'location' | 'start'>(
    'signup'
  );

  const handleSignup = (data: SignupFormData) => {
    console.log('회원가입 데이터:', data);
    setCurrentStep('modal');
  };

  const handleCloseModal = () => {
    setCurrentStep('location');
  };

  const handleSaveLocation = () => {
    console.log('위치 저장 완료');
    onLocationComplete?.();
  };

  const handleSkipLocation = () => {
    console.log('위치 설정 건너뛰기');
    setCurrentStep('start');
  };

  const handleStartActivity = () => {
    router.push('/');
  };

  if (currentStep === 'start') {
    return <SignupDone onStartActivity={handleStartActivity} />;
  }

  if (currentStep === 'location') {
    return (
      <LocationSetup onSaveLocation={handleSaveLocation} onSkipLocation={handleSkipLocation} />
    );
  }

  return (
    <>
      {currentStep === 'signup' && <SignupForm onSignup={handleSignup} />}

      <BottomModal isOpen={currentStep === 'modal'} onClose={handleCloseModal} />
    </>
  );
};

export default Signup;
