import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const textareaStyles = cva(
  'border-input focus-visible:border-primary-500 focus-visible:ring-ring/10 aria-invalid:ring-danger-500/20 aria-invalid:border-danger-500 field-sizing-content flex w-full border bg-transparent py-2 text-base outline-none transition-[color] placeholder:text-sm placeholder:text-neutral-400 focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none',
  {
    variants: {
      variant: {
        create: 'h-40 rounded-md px-3',
        chat: 'max-h-20 min-h-1  rounded-3xl pl-4',
      },
    },
    defaultVariants: {
      variant: 'create',
    },
  }
);

type TextareaProps = React.ComponentProps<'textarea'> & VariantProps<typeof textareaStyles>;

const Textarea = ({ className, variant, ...props }: TextareaProps) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaStyles({ variant, class: className }))}
      {...props}
    />
  );
};

export { Textarea };
