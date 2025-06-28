import React from 'react';
import { CircleX } from 'lucide-react';

interface InputSearchProps {
  id: string;
}

const InputSearch = ({ id, ...props }: InputSearchProps) => {
  const handleClick = () => {
    console.log('click 하면 input 메시지 삭제 기능 추가하기');
  };

  return (
    <div className="shadow-xs flex h-11 w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base text-neutral-400 transition-[color,box-shadow] focus-within:border-neutral-400 focus-within:ring-[2px] focus-within:ring-neutral-400/50 md:text-sm">
      <div className="flex items-center gap-2 [&>svg]:h-5 [&>svg]:w-5">
        <input
          id={id}
          placeholder="검색어를 입력하세요."
          {...props}
          className="selection:bg-primary selection:text-primary-foreground file:text-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="cursor-pointer [&>svg]:h-5 [&>svg]:w-5"
      >
        <CircleX className="fill-neutral-300 text-white" />
      </button>
    </div>
  );
};

export default InputSearch;
