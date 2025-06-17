'use client';

import { useQuery } from '@tanstack/react-query';
import { Heart, Plus, Search, Settings, User } from 'lucide-react';

import { fetchTestData } from '~shared/api/test';

export const TestLucide = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test-data'],
    queryFn: fetchTestData,
  });

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">프론트엔드 설정 테스트</h3>

      {/* Lucide React 테스트 */}
      <div className="flex gap-4">
        <Heart className="h-6 w-6 text-red-500" />
        <User className="h-6 w-6 text-blue-500" />
        <Search className="h-6 w-6 text-green-500" />
        <Plus className="h-6 w-6 text-purple-500" />
        <Settings className="h-6 w-6 text-gray-500" />
      </div>

      {/* TanStack Query 테스트 */}
      <div className="rounded border p-4">
        <h4 className="mb-2 font-medium">TanStack Query 테스트:</h4>
        {isLoading && <p>데이터 로딩 중...</p>}
        {error && <p className="text-red-500">에러 발생: {error.message}</p>}
        {data && (
          <div>
            <p className="text-green-600">{data.message}</p>
            <p className="text-sm text-gray-500">
              시간: {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
