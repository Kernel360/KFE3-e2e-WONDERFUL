'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

type SignupStep = 'form' | 'success' | 'location' | 'done';

export const useSignupFlow = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SignupStep>('form');

  const goToSuccess = () => setCurrentStep('success');
  const goToLocationSetup = () => setCurrentStep('location');
  const goToDone = () => setCurrentStep('done');

  const handleSaveLocation = () => {
    goToDone();
  };

  const handleStartActivity = () => {
    document.cookie = 'signup-flow=; path=/; max-age=0';
    router.push('/');
  };

  return {
    currentStep,
    goToSuccess,
    goToLocationSetup,
    goToDone,
    handleSaveLocation,
    handleStartActivity,
  };
};
