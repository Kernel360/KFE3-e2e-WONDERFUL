'use client';

import React, { useState } from 'react';
import { User, CheckCircle } from 'lucide-react';

import InputIcon from '@/components/common/input/icon';
import SubmitButton from '@/components/auth/submit-button';
import ErrorMessage from '@/components/auth/error-message';

type Step = 1 | 3;

interface FindEmailFormProps {
  onSuccess?: (userInfo: { username: string; email: string }) => void;
}

const FindEmailForm = ({ onSuccess }: FindEmailFormProps) => {
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
      // TODO: 실제 수파베이스 연동 시 여기에 구현
      // const result = await findEmailByName(formData.name);

      // 임시 더미 로직 (50% 확률로 성공/실패)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 로딩 시뮬레이션

      const isSuccess = Math.random() > 0.5; // 임시 성공/실패 로직

      if (isSuccess) {
        // 성공 시 결과 설정
        const result = {
          username: 'username', // 실제로는 API에서 받은 사용자명
          email: 'User***@test.com', // 실제로는 API에서 받은 마스킹된 이메일
        };

        setUserInfo(result);
        setCurrentStep(3);
        onSuccess?.(result);
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

  // 다시 시도
  const handleRetry = () => {
    setCurrentStep(1);
    setFormData({ name: '' });
    setFieldErrors({});
  };

  // 폼 유효성 검사
  const isFormValid = (): boolean => {
    return !!formData.name.trim();
  };

  // Step 1 렌더링 (입력 단계)
  const renderStep1 = () => (
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

  // Step 3 렌더링 (성공)
  const renderStep3 = () => (
    <div className="flex flex-col items-center">
      {/* 성공 아이콘 */}
      <div className="bg-success-50 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
        <CheckCircle className="text-success-500 h-8 w-8" />
      </div>

      {/* 결과 메시지 */}
      <div className="mb-6 text-center">
        <p className="text-base text-neutral-600">
          <span className="font-medium text-neutral-900">{userInfo.username}</span>님이 가입하신
          이메일은
        </p>
        <p className="text-primary-500 mt-1 text-lg font-semibold">{userInfo.email}</p>
        <p className="mt-1 text-base text-neutral-600">입니다.</p>
      </div>

      {/* 안내 메시지 */}
      <div className="flex items-center justify-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">!</span>
        </div>
        <span className="ml-2 text-sm text-neutral-600">위의 이메일로 로그인하실 수 있습니다.</span>
      </div>

      {/* 다시 찾기 버튼 */}
      <button
        type="button"
        onClick={handleRetry}
        className="hover:text-primary-500 mt-6 text-sm text-neutral-600 transition-colors"
      >
        다른 정보로 다시 찾기
      </button>
    </div>
  );

  // 현재 단계에 따른 렌더링
  return currentStep === 1 ? renderStep1() : renderStep3();
};

export default FindEmailForm;
