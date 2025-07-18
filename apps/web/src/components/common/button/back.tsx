'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

const BackButton = () => {
  const routes = useRouter();

  return (
    <button
      type="button"
      onClick={() => routes.back()}
      aria-label="Go back"
    >
      <ChevronLeftIcon />
      <span className="sr-only">Go back</span>
    </button>
  );
};

export default BackButton;
