'use client';

import { Plus } from 'lucide-react';

import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';

interface ButtonCreateProps {
  children: React.ReactNode;
  status: 'default' | 'disabled';
}

const LocationButtonCreate = ({ children, status }: ButtonCreateProps) => {
  const { openLocationModal } = useLocationModalStore();

  const handleClick = () => {
    if (status === 'disabled') return;
    openLocationModal();
  };

  if (status === 'disabled') {
    return (
      <div className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-4 text-lg text-neutral-300">
        <Plus className="h-6 w-6 stroke-2" />
        <p>최대 3개까지 등록 가능</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="border-primary-500 text-primary-500 hover:bg-primary-50 focus-visible:ring-primary-500 inline-flex h-12 items-center justify-center gap-1.5 rounded-md border bg-transparent px-4 text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <Plus className="h-6 w-6 stroke-2" />
      <p>{children}</p>
    </button>
  );
};

export default LocationButtonCreate;
