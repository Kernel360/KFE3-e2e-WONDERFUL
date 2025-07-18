import { AlarmClock, ChevronRight } from 'lucide-react';

interface ButtonDirectDealProps {
  directPrice: string;
}

const ButtonDirectDeal = ({ directPrice }: ButtonDirectDealProps) => {
  return (
    <button
      type="button"
      className="bg-primary-50 mb-1 flex w-full items-center justify-between gap-2 rounded-sm py-2.5 pl-4 pr-2"
    >
      <AlarmClock className="text-indigo-500" strokeWidth={2.5} size={20} />
      <p className="flex-1 pt-0.5 text-left font-medium text-neutral-900">
        지금
        <span className="font-semibold text-indigo-500">{' ' + directPrice}</span>에 즉시구매 하기
      </p>
      <ChevronRight className="size-6 text-neutral-600" />
    </button>
  );
};

export default ButtonDirectDeal;
