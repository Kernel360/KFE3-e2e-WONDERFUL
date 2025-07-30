'use client';

import { Camera } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

import { useToastStore } from '@/lib/zustand/store';

const InputCamera = () => {
  const { showToast } = useToastStore();

  const handleClick = () => {
    showToast({
      status: 'notice',
      title: '준비중인 기능',
      subtext: '카메라 촬영 및 전송 기능은 현재 준비중입니다.',
      autoClose: true,
    });
  };

  return (
    <div className={serviceStyle().wrapper()}>
      <button type="button" className={serviceStyle().label()} onClick={handleClick}>
        {/*<input type="file" className="hidden" accept="image/*" capture="environment" />*/}
        <Camera size={28} />
      </button>
      <p className={serviceStyle().title()}>카메라</p>
    </div>
  );
};

export default InputCamera;
