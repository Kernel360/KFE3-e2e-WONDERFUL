'use client';

import { useState } from 'react';

import { ImageUp } from 'lucide-react';

import AddAuctionThumbnail from '@/components/add-auction/add-auction-thumbnail';

import { onChangeImages } from '@/hooks/common/useOnChangeImages';

import { AttacedAuctionImage } from '@/types/auction';

const ImagesUploader = () => {
  const [saveImages, setSaveImages] = useState<AttacedAuctionImage[]>([]);

  return (
    <div>
      <div className="w-fit">
        <input type="file" id="attachImages" className="hidden" />
        <label
          htmlFor="attachImages"
          className="w-15 h-15 flex flex-col items-center justify-center gap-0.5 rounded-md border border-neutral-200 text-neutral-600"
        >
          <ImageUp />
          <p className="text-min font-medium">0/8</p>
        </label>
      </div>
      {!saveImages
        ? ''
        : saveImages!.map((item, idx) => {
            return <AddAuctionThumbnail key={idx} url={item.url} />;
          })}
    </div>
  );
};

export default ImagesUploader;
