import React from 'react';

import { Check } from 'lucide-react';

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomModal = ({ isOpen, onClose }: BottomModalProps) => {
  if (!isOpen) return null;

  const handleGoToLogin = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="animate-in slide-in-from-bottom relative h-[560px] w-full max-w-md rounded-t-3xl bg-white text-center duration-300">
        <div className="mt-[138px] flex justify-center">
          <div className="relative">
            <div className="bg-primary-300 flex h-16 w-16 items-center justify-center rounded-full">
              <div className="bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full">
                <Check className="h-6 w-6 stroke-[3px] text-white" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-10 text-center text-3xl font-bold text-neutral-900">가입 성공</h2>

        <p className="mt-10 text-center text-xs font-medium text-neutral-600">
          축하합니다. 이제 서비스를 이용하실 수 있습니다.
        </p>

        <div className="mt-10">
          <span className="text-xs font-medium text-neutral-600">다음 단계는? </span>
          <button
            onClick={handleGoToLogin}
            className="text-primary-500 hover:text-primary-600 cursor-pointer border-none bg-transparent text-xs font-medium transition-colors"
          >
            지역 설정!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
