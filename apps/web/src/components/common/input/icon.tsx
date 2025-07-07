import React from 'react';

interface InputIconProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  children: React.ReactNode;
}

const InputIcon = ({ id, label, children, ...props }: InputIconProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="shadow-xs flex h-11 w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base text-neutral-400 transition-[color,box-shadow] focus-within:border-neutral-400 focus-within:ring-[2px] focus-within:ring-neutral-400/50 md:text-sm">
        <div className="flex items-center gap-2 [&>svg]:h-5 [&>svg]:w-5">
          {React.Children.toArray(children)[0]}
          <input
            id={id}
            {...props}
            className="selection:bg-primary selection:text-primary-foreground file:text-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="[&>button>svg]:h-5 [&>button>svg]:w-5 [&>svg]:h-5 [&>svg]:w-5">
          {React.Children.toArray(children)[1]}
        </div>
      </div>
    </div>
  );
};

export default InputIcon;
