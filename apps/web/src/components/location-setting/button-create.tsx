'use client';

import { Plus } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';

interface ButtonCreateProps {
  children: React.ReactNode;
  status: 'default' | 'disabled';
}

const style = tv({
  base: "h-12 rounded-md px-5 has-[>svg]:px-4 text-lg [&_svg]:!w-6.5 [&_svg]:stroke-[2px] border bg-transparent inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer [&_svg]:!h-auto",
  variants: {
    status: {
      default: ' border-primary-500 text-primary-500 hover:bg-primary-50',
      disabled: 'border-neutral-200 bg--50 text-neutral-300',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

const ButtonCreate = ({ children, status }: ButtonCreateProps) => {
  const handleClick = () => {
    const { openLocationModal } = useLocationModalStore.getState();
    openLocationModal();
  };

  if (status === 'disabled') {
    return (
      <div className={style({ status })}>
        <Plus size={16} />
        <p>최대 3개까지 등록 가능</p>
      </div>
    );
  }

  return (
    <button onClick={handleClick} className={style({ status })}>
      <Plus size={16} />
      <p>{children}</p>
    </button>
  );
};

export default ButtonCreate;
