'use client';

import { useState } from 'react';

type ResetPasswordStep = 1 | 2 | 3 | 4;

export const useResetPasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState<ResetPasswordStep>(1);

  const goToEmailSent = () => setCurrentStep(2);
  const goToNewPassword = () => setCurrentStep(3);
  const goToComplete = () => setCurrentStep(4);
  const goToInput = () => setCurrentStep(1);

  return {
    currentStep,
    goToEmailSent,
    goToNewPassword,
    goToComplete,
    goToInput,
  };
};
