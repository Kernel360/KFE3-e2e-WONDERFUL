import { tv } from 'tailwind-variants';

const productCardStyle = tv({
  slots: {
    wrapper: 'border-y-1 flex h-auto w-full flex-col justify-between border-neutral-100 p-3',
    loading: 'text-lg text-neutral-600',
    error: 'text-danger-600 text-lg',
  },
});

export default productCardStyle;
