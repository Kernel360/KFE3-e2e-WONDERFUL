import { cn } from '@/lib/cn';
import { formatCurrencyWithUnit } from '@/lib/utils/price';

import { BidType } from '@/types/bid';

import BidderAvatar from './bidder-avatar';

const BidTableRow = ({ item }: { item: BidType }) => {
  // user uuid 가져와서 비교
  const userid = 'user-001';
  const isAuthor = item.bidder_id === userid;

  const bid = formatCurrencyWithUnit(item.price);

  return (
    <li className="flex items-center justify-between text-center">
      <BidderAvatar isAuthor={isAuthor} />
      <div
        className={cn(
          'ml-3 flex w-full rounded-sm bg-white p-2.5 text-sm text-neutral-600 opacity-90',
          isAuthor &&
            'border-1 border-primary-500 text-primary-600 shadow-primary-300 font-bold opacity-100 shadow-sm'
        )}
      >
        <p>{item.nickname}</p>
        <p>{bid}</p>
      </div>
    </li>
  );
};

export default BidTableRow;
