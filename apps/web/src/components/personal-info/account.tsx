import { tv } from 'tailwind-variants';

import { BadgePrimary, BankIcon } from '@/components/personal-info';

const style = tv({
  base: 'flex items-center justify-between rounded-xl p-3',
  variants: {
    color: {
      default: 'bg-white',
      selected: 'bg-primary-50/70',
    },
  },
});

interface AccountProps {
  color?: 'default' | 'selected';
  children: React.ReactNode;
  account: Account;
}

export interface Account {
  name: string;
  bank: string;
  account: string;
  isPrimary: boolean;
}

const Account = ({ color, children, account }: AccountProps) => {
  return (
    <div className={style({ color })}>
      <div className="flex items-center gap-4">
        <BankIcon />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-neutral-900">{account.name}</p>
            {account.isPrimary && <BadgePrimary />}
          </div>
          <div className="flex gap-1 text-sm font-medium text-neutral-600">
            <p>{account.bank}</p>
            <p>{account.account}</p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Account;
