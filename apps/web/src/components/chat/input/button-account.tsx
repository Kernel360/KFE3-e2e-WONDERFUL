import { Wallet } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';
import { AccountDrawerContent } from '@/components/personal-info';
import { Drawer, DrawerTrigger } from '@/components/ui';

const ButtonAccount = () => {
  return (
    <div className={serviceStyle().wrapper()}>
      <Drawer>
        <DrawerTrigger asChild>
          <button className={serviceStyle().label()}>
            <Wallet size={28} />
          </button>
        </DrawerTrigger>
        <p className={serviceStyle().title()}>계좌 공유</p>
        <AccountDrawerContent />
      </Drawer>
    </div>
  );
};

export default ButtonAccount;
