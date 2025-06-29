import { AttacedAuctionImage } from '@/lib/types/auction';

import Thumbnail from '../common/thumbnail';

const AttacedAuctionThumbnail = ({ url }: AttacedAuctionImage) => {
  if (!url) return null;

  return (
    <div>
      <Thumbnail className="size-16" alt="" url={url} />
    </div>
  );
};

export default AttacedAuctionThumbnail;
