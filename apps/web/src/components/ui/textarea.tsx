import { cn } from '@/lib/cn';

const Textarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input focus-visible:border-primary-500 focus-visible:ring-ring/10 aria-invalid:ring-danger-500/20 aria-invalid:border-danger-500 field-sizing-content flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color] placeholder:text-sm placeholder:text-neutral-400 focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
};

export { Textarea };
