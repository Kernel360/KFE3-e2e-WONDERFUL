'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { X, Search } from 'lucide-react';

import { useSearchHistory } from '@/hooks/common/useSearchHistory';

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
}: InputSearchProps) => {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const { addSearchQuery } = useSearchHistory();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClear = useCallback(() => {
    setValue('');
    if (onSearch) {
      onSearch('');
    } else {
      // URL 방식으로 동작
      router.push('/search');
    }
  }, [onSearch, router]);

  const performSearch = useCallback(
    (searchQuery: string) => {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      // 검색 기록에 추가
      addSearchQuery(trimmedQuery);

      if (onSearch) {
        onSearch(trimmedQuery);
      } else {
        // URL 방식으로 동작
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      }
    },
    [onSearch, router, addSearchQuery]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      performSearch(value);
    },
    [value, performSearch]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b-1 flex h-[80%] w-full items-center gap-2 border-neutral-800 px-1 text-neutral-800 [&_input]:h-[60%]"
    >
      <Search size={24} className="shirkin" />
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="flex size-5 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
};

export default InputSearch;
