import { tv } from 'tailwind-variants';

const serviceStyle = tv({
  slots: {
    wrapper: 'flex flex-col items-center gap-2',
    label:
      'bg-primary-50 text-primary-500 p-4 flex size-14 items-center justify-center rounded-full',
    title: 'text-xs font-semibold text-neutral-600',
  },
});

export default serviceStyle;
