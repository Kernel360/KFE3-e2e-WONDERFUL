'use client';

import { AlarmClock, X } from 'lucide-react';
import { useState } from 'react';

interface SearchLogProps {
  logs: Log[];
}

export interface Log {
  id: string;
  content: string;
}

const SearchLog = ({ logs }: SearchLogProps) => {
  const [logList, setLogList] = useState<Log[]>(logs);

  const handleDelete = (id: string) => {
    setLogList((prev) => prev.filter((log) => log.id !== id));
  };

  return (
    <div className="flex w-full flex-col gap-4 py-4 pl-6 pr-4">
      <p className="text-lg font-bold text-neutral-900">최근 검색어</p>
      <div>
        {logList.length === 0 ? (
          <p className="font-regular flex justify-center text-neutral-600">
            최근 검색어가 없습니다.
          </p>
        ) : (
          logList.map((log) => (
            <div key={log.id} className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <AlarmClock className="text-neutral-500" strokeWidth={2.5} size={20} />
                <span>{log.content}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(log.id)}
                className="flex h-10 w-10 items-center justify-center"
              >
                <X />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchLog;
