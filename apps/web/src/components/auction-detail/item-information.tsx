import Countdown from '@/components/auction-detail/countdown';
import { Badge } from '@/components/ui/badge';

import useCountdown from '@/hooks/common/useCountdown';
import { formatDate } from '@/lib/utils/date';

interface ItemInformationProps {
  item: Item;
}

export interface Item {
  title: string;
  status: string;
  endTime: string;
}

const ItemInformation = ({ item }: ItemInformationProps) => {
  const deadline = formatDate(new Date(item.endTime));

  // 실시간으로 경매 종료 여부 확인
  const { isExpired } = useCountdown(new Date(item.endTime));

  // 실제 경매 상태 결정 (서버 상태 + 실시간 시간 비교)
  const actualStatus = isExpired ? '경매종료' : '경매중';

  // Badge variant 결정
  const getBadgeVariant = () => {
    if (isExpired) return 'closed'; // 경매 종료시 회색
    return 'primary'; // 경매 진행중일 때 파란색
  };

  return (
    <section className="flex h-auto w-full flex-col border-b border-t border-neutral-100 bg-white p-4">
      <Badge variant={getBadgeVariant()} className={'rounded-sm px-1.5 py-0 text-xs'}>
        {actualStatus}
      </Badge>
      <h2 className="mt-1.5 text-xl font-semibold text-neutral-900">{item.title}</h2>
      <div className="mt-2 flex justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900">마감시간</span>
          <time className="text-sm font-medium text-neutral-400">{deadline}</time>
        </div>
        <Countdown date={new Date(item.endTime)} />
      </div>
    </section>
  );
};

export default ItemInformation;
