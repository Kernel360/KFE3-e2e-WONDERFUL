import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/lib/actions/profile';

// 내 프로필 조회 훅
export const useMyProfile = () => {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getMyProfile,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};
