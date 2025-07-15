'use client';

import React, { useState } from 'react';

import { User } from 'lucide-react';

import ErrorMessage from '@/components/auth/error-message';
import { FindEmailSuccess } from '@/components/auth/find-email';
import SubmitButton from '@/components/auth/submit-button';
import InputIcon from '@/components/common/input/icon';

type Step = 1 | 2;

const FindEmailForm = () => {
  // 단계 관리
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // 폼 데이터
  const [formData, setFormData] = useState({
    name: '',
  });

  // 결과 데이터
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });

  // UI 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // 해당 필드 에러 초기화
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // 폼 제출
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      const isSuccess = Math.random() > 0.5; // 임시 성공/실패 로직

      if (isSuccess) {
        // 성공 시 결과 설정
        const result = {
          username: 'username', // 실제로는 API에서 받은 사용자명
          email: 'User***@test.com', // 실제로는 API에서 받은 마스킹된 이메일
        };

        setUserInfo(result);
        setCurrentStep(2);
      } else {
        // 실패 시 에러 메시지 설정
        setFieldErrors({ name: '유저 정보가 없습니다.' });
      }
    } catch (error) {
      console.error('이메일 찾기 오류:', error);
      setFieldErrors({ name: '이메일 찾기 중 오류가 발생했습니다.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 폼 유효성 검사
  const isFormValid = (): boolean => {
    return !!formData.name.trim();
  };

  //입력 단계
  const renderInputForm = () => (
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center">
      {/* 이름 입력 필드 */}
      <div
        className={`h-[54px] w-[327px] ${
          fieldErrors.name
            ? '[&_.shadow-xs]:border-danger-600 [&_.shadow-xs]:bg-danger-50 [&_.shadow-xs]:focus-within:border-danger-600 [&_.shadow-xs]:focus-within:ring-danger-600/50'
            : ''
        }`}
      >
        <InputIcon
          id="name"
          name="name"
          type="text"
          placeholder="회원정보 입력 (예. 01012345678)"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange('name', e.target.value)
          }
          className={fieldErrors.name ? 'text-danger-600 placeholder:text-danger-600/60' : ''}
        >
          <User className={fieldErrors.name ? 'text-danger-600' : 'text-neutral-900'} />
        </InputIcon>
      </div>

      <ErrorMessage errors={fieldErrors} />

      {/* 제출 버튼 */}
      <div className="mt-[26px]">
        <SubmitButton isFormValid={isFormValid()} isSubmitting={isSubmitting}>
          이메일 찾기
        </SubmitButton>
      </div>
    </form>
  );

  // 현재 단계에 따른 렌더링
  if (currentStep === 2) {
    return <FindEmailSuccess userInfo={userInfo} />;
  }

  return renderInputForm();
};

export default FindEmailForm;
