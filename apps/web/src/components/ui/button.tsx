import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        // defualt=solid type
        default: '[&_svg]:stroke-white',
        outline: 'border bg-background  hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-11 px-4 py-2 has-[>svg]:px-3 text-base font-weight-medium',
        min: 'h-8 text-sm font-weight-semibold px-3',
        sm: 'h-10 rounded-md gap-1.5 px-4 has-[>svg]:px-2.5 text-sm font-weight-medium ',
        lg: 'h-12 rounded-md px-5 has-[>svg]:px-4 text-lg',
      },
      color: {
        // defualt=primary color
        default: 'bg-primary-500 text-primary-foreground hover:bg-primary-700',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        disabled: 'hover:bg-accent hover:text-accent-foreground ',
        positive: '',
        negative:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 ',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
      fullWidth: false,
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  color,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, fullWidth }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
