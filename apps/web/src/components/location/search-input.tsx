'use client';

import React from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  isSearching?: boolean;
  disabled?: boolean;
  className?: string;
}

const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = '검색어를 입력하세요',
  isSearching = false,
  disabled = false,
  className = '',
}: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isSearching}
        className="pr-12"
      />
      <button
        onClick={onSearch}
        disabled={isSearching || !value.trim() || disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform p-1.5 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
        type="button"
      >
        {isSearching ? (
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
        ) : (
          <Search className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default SearchInput;
