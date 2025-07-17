import { Wallet } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

const ButtonAccount = () => {
  //TODO: onClick -> open Modal 핸들러 추가

  return (
    <div className={serviceStyle().wrapper()}>
      <button className={serviceStyle().label()} onClick={() => {}}>
        <Wallet size={28} />
      </button>
      <p className={serviceStyle().title()}>계좌 공유</p>
    </div>
  );
};

export default ButtonAccount;
