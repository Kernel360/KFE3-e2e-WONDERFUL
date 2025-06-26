import { Badge } from '@/components/ui/badge';
import Countdown from '@/components/common/countdown';
import { formatDate } from '@/utils/date';

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

  return (
    <section className="flex h-auto w-full flex-col border-b border-t border-neutral-100 bg-white p-4">
      <Badge className="rounded-sm px-1.5 py-0 text-xs">{item.status}</Badge>
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
