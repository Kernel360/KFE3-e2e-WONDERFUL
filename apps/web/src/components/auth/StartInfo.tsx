import React from 'react';

import { Button } from '@/components/ui/button';

interface StartInfoProps {
  onStartActivity: () => void;
}

const StartInfo = ({ onStartActivity }: StartInfoProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 상단 컨텐츠 */}
      <div className="flex-1 px-6">
        {/* 축하 일러스트 - 상단에서 40px */}
        <div className="flex justify-center" style={{ marginTop: '40px' }}>
          <div
            className="bg-primary-500 flex items-center justify-center rounded-2xl"
            style={{ width: '375px', height: '375px' }}
          >
            <span
              className="text-white"
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-medium)',
                fontFamily: 'var(--font-body)',
              }}
            >
              축하 일러스트
            </span>
          </div>
        </div>

        {/* 축하합니다! 제목 - 일러스트 아래 14px */}
        <h1
          style={{
            marginTop: '14px',
            color: '#000',
            textAlign: 'center',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '38px',
            fontFamily: 'var(--font-heading)',
            marginBottom: '14px',
          }}
        >
          축하합니다!
        </h1>

        {/* 설명 텍스트 - 제목 아래 14px */}
        <p
          style={{
            color: 'var(--Neutral-70, #656565)',
            textAlign: 'center',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '22px',
            fontFamily: 'var(--font-body)',
          }}
        >
          회원가입이 성공적으로 완료되었습니다.
        </p>
      </div>

      {/* 하단 버튼 영역 - 94px 간격 */}
      <div className="px-6" style={{ marginBottom: '94px' }}>
        <Button
          onClick={onStartActivity}
          size="lg"
          color="primary"
          fullWidth={true}
          className="h-14"
        >
          활동 시작하기
        </Button>
      </div>
    </div>
  );
};

export default StartInfo;
