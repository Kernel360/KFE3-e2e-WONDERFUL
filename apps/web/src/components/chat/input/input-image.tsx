'use client';

import { Images } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

import { useToastStore } from '@/lib/zustand/store';

const InputImage = () => {
  const { showToast } = useToastStore();

  const handleClick = () => {
    showToast({
      status: 'notice',
      title: '준비중인 기능',
      subtext: '이미지 전송 기능은 현재 준비중입니다.',
      autoClose: true,
    });
  };

  return (
    <div className={serviceStyle().wrapper()}>
      <button type="button" className={serviceStyle().label()} onClick={handleClick}>
        {/*<input type="file" className="hidden" accept="image/*,video/*" capture="environment" />*/}
        <Images size={28} />
      </button>
      <p className={serviceStyle().title()}>사진/동영상</p>
    </div>
  );
};

export default InputImage;
