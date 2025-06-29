'use client';

import { useState } from 'react';

import AddAuctionThumbnail from '@/components/add-auction/add-auction-thumbnail';
import AttachImageInput from '@/components/add-auction/attach-image-input';

import { AttacedAuctionImage } from '@/types/auction';

const ImagesUploader = () => {
  const [saveImages, setSaveImages] = useState<AttacedAuctionImage[]>([{ url: '' }]);

  return (
    <div>
      <AttachImageInput />
      {!saveImages
        ? ''
        : saveImages!.map((item, idx) => {
            return <AddAuctionThumbnail key={idx} url={item.url} />;
          })}
    </div>
  );
};

export default ImagesUploader;
