'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { FloatButton } from '@/components/ui/float-button';

const CreateAuctionButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auction/createAuction');
  };

  return (
    <div className="absolute bottom-28 right-6 z-50">
      <FloatButton
        onClick={handleClick}
        size="medium"
        className="bg-indigo-500 text-white shadow-[0px_4px_8px_0px_rgba(0,0,0,0.2)]"
      >
        <Plus className="size-7" />
      </FloatButton>
    </div>
  );
};

export default CreateAuctionButton;
