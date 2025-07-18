'use client';

import { MapPinHouse } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

const ButtonAddress = () => {
  //TODO: onClick -> open Modal 핸들러 추가

  return (
    <div className={serviceStyle().wrapper()}>
      <button className={serviceStyle().label()} onClick={() => {}}>
        <MapPinHouse size={28} />
      </button>
      <p className={serviceStyle().title()}>주소 공유</p>
    </div>
  );
};

export default ButtonAddress;
