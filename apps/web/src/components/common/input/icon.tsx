import React from 'react';

import { RotateCcw } from 'lucide-react';

import { formatCurrency } from '@/lib/utils/price';
interface InputIconProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  label?: string;
  children: React.ReactNode;
  minBidUnit?: number; // 입찰 단위
  resetValue?: number; // 초기화할 값
  onReset?: () => void; // 초기화 콜백
}

const InputIcon = ({
  id,
  label,
  children,
  minBidUnit,
  resetValue,
  onReset,
  value,
  ...props
}: InputIconProps) => {
  const showResetButton =
    resetValue !== undefined && onReset && value && Number(value) !== resetValue;
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}{' '}
          <span className="text-xs text-neutral-500">
            (입찰 단위: <strong>{formatCurrency(minBidUnit || 0)}</strong>원)
          </span>
        </label>
      )}
      <div className="shadow-xs flex h-11 w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base text-neutral-400 transition-[color,box-shadow] focus-within:border-neutral-400 focus-within:ring-[2px] focus-within:ring-neutral-400/50 md:text-sm">
        <div className="flex items-center gap-2 [&>svg]:h-5 [&>svg]:w-5">
          {React.Children.toArray(children)[0]}
          <input
            id={id}
            value={value}
            {...props}
            className="selection:bg-primary selection:text-primary-foreground file:text-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="h-[20px] [&>button>svg]:h-5 [&>button>svg]:w-5 [&>svg]:h-5 [&>svg]:w-5">
          {showResetButton && (
            <button
              type="button"
              onClick={onReset}
              className="cursor-pointer transition-opacity hover:opacity-70"
              title="현재가로 초기화"
            >
              <RotateCcw className="text-neutral-400" />
            </button>
          )}
          {React.Children.toArray(children)[1]}
        </div>
      </div>
    </div>
  );
};

export default InputIcon;
