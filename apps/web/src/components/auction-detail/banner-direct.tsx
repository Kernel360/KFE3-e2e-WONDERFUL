import { AlarmClock, ChevronRight } from 'lucide-react';

interface BannerDirectProps {
  directPrice: string;
}

const BannerDirect = ({ directPrice }: BannerDirectProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-between rounded-sm bg-indigo-50 pl-3 pr-1">
      <div className="flex items-center gap-2 pl-1.5">
        <AlarmClock className="text-indigo-500" strokeWidth={2.5} size={20} />
        <div className="flex items-center font-medium text-neutral-900">
          <span>
            지금
            <span className="ml-1 font-semibold text-indigo-500">{directPrice}</span>에 즉시구매
            하기
          </span>
        </div>
      </div>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center"
        onClick={() => {}}
      >
        <ChevronRight className="text-neutral-600" />
      </button>
    </div>
  );
};

export default BannerDirect;
