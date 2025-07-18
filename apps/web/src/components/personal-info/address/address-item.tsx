import { tv } from 'tailwind-variants';

import { BadgePrimary } from '@/components/personal-info';

const style = tv({
  base: 'flex items-center justify-between rounded-xl p-3',
  variants: {
    color: {
      default: 'bg-white',
      selected: 'bg-primary-50/70',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

interface AddressProps {
  color?: 'default' | 'selected';
  children: React.ReactNode;
  address: AddressItem;
}

export interface AddressItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  isPrimary: boolean;
}

const Address = ({ color, children, address }: AddressProps) => {
  return (
    <div className={style({ color })}>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium text-neutral-900">{address.name}</p>
          {address.isPrimary && <BadgePrimary />}
        </div>
        <div className="text-sm font-medium">
          <p className="text-neutral-900">{address.address}</p>
          <p className="text-neutral-500">{address.phone}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Address;
