import { AlarmClock, X } from 'lucide-react';

interface SearchLogProps {
  logs: Log[];
}

export interface Log {
  id: string;
  content: string;
}

const SearchLog = ({ logs }: SearchLogProps) => {
  return (
    <div className="flex w-full flex-col gap-4 px-8 py-4">
      <p className="text-lg font-bold text-neutral-900">최근 검색어</p>
      <div>
        {logs.map((log) => (
          <div key={log.id} className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <AlarmClock className="text-neutral-500" strokeWidth={2.5} size={20} />
              <span>{log.content}</span>
            </div>
            <button type="button" className="flex h-10 w-10 items-center justify-center">
              <X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchLog;
