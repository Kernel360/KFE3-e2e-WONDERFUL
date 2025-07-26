import { useQuery } from '@tanstack/react-query';

import { getCurrentUserClient } from '@/lib/utils/auth-client';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUserClient, // 클라이언트용 함수 사용
    staleTime: 1000 * 60 * 5, // 5분간 캐시
    gcTime: 1000 * 60 * 10, // 10분간 메모리에 보관
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export type UseCurrentUserReturn = ReturnType<typeof useCurrentUser>;
