'use client';

import React, { useState, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { CircleX, Search } from 'lucide-react';

interface InputSearchProps {
  id: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const InputSearch = ({
  id,
  onSearch,
  placeholder = '검색어를 입력하세요.',
  defaultValue = '',
  ...props
}: InputSearchProps) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  const handleClear = useCallback(() => {
    setValue('');
    if (onSearch) {
      onSearch('');
    } else {
      // URL 방식으로 동작
      router.push('/search');
    }
  }, [onSearch, router]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) {
        if (onSearch) {
          onSearch(value.trim());
        } else {
          // URL 방식으로 동작
          router.push(`/search?q=${encodeURIComponent(value.trim())}`);
        }
      }
    },
    [value, onSearch, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (value.trim()) {
          if (onSearch) {
            onSearch(value.trim());
          } else {
            // URL 방식으로 동작
            router.push(`/search?q=${encodeURIComponent(value.trim())}`);
          }
        }
      }
    },
    [value, onSearch, router]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="shadow-xs flex h-11 w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base text-neutral-400 transition-[color,box-shadow] focus-within:border-neutral-400 focus-within:ring-[2px] focus-within:ring-neutral-400/50 md:text-sm">
        <div className="flex flex-1 items-center gap-2 [&>svg]:h-5 [&>svg]:w-5">
          <Search className="text-neutral-400" />
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            {...props}
            className="selection:bg-primary selection:text-primary-foreground file:text-foreground aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex-1 text-black file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:shadow-none focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="cursor-pointer [&>svg]:h-5 [&>svg]:w-5"
          >
            <CircleX className="fill-neutral-300 text-white" />
          </button>
        )}
      </div>
    </form>
  );
};

export default InputSearch;
