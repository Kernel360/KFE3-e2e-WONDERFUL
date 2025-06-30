// apps/web/src/components/common/add-auction-button.tsx

'use client';

import { useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

import { FloatButton } from '@/components/ui/float-button';

const AddAuctionButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auction/addAuction');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FloatButton
        onClick={handleClick}
        size="medium"
        className="bg-indigo-500 text-white shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <Plus className="size-7" />
      </FloatButton>
    </div>
  );
};

export default AddAuctionButton;
