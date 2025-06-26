import React from 'react';

import { Check } from 'lucide-react';

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
}

const BottomModal = ({ isOpen, onClose, onGoToLogin }: BottomModalProps) => {
  if (!isOpen) return null;

  const handleGoToLogin = () => {
    onGoToLogin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div
        className="animate-in slide-in-from-bottom relative w-full max-w-md rounded-t-3xl bg-white text-center duration-300"
        style={{ height: '560px' }}
      >
        {/* 성공 아이콘 - 138px 아래에 위치 */}
        <div className="flex justify-center" style={{ marginTop: '138px' }}>
          <div className="relative">
            {/* 외부 원 (64x64) */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'var(--color-primary-300)',
              }}
            >
              {/* 내부 원 (48x48) */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--color-primary-500)',
                }}
              >
                <Check
                  className="text-white"
                  style={{
                    width: '24px',
                    height: '24px',
                    strokeWidth: '3px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 가입 성공 제목 - 아이콘 아래 40px */}
        <h2
          className="text-neutral-900"
          style={{
            marginTop: '40px',
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: 'var(--line-height-h2)',
          }}
        >
          가입 성공
        </h2>

        {/* 설명 텍스트 - 제목 아래 40px */}
        <p
          className="text-neutral-600"
          style={{
            marginTop: '40px',
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-min)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-min)',
          }}
        >
          축하합니다. 이제 서비스를 이용하실 수 있습니다.
        </p>

        {/* 지역설정 안내 - 설명 아래 40px */}
        <div style={{ marginTop: '40px' }}>
          <span
            className="text-neutral-600"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-min)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-min)',
            }}
          >
            다음 단계는?{' '}
          </span>
          <button
            onClick={handleGoToLogin}
            className="text-primary-500 hover:text-primary-600 transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-min)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-min)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            지역 설정!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
