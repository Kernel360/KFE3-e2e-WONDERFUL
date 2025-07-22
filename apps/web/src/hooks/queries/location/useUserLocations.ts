import { useQuery } from '@tanstack/react-query';

import { getUserLocations } from '@/lib/actions/location';
import type { LocationType } from '@/lib/types/location';

export const useUserLocations = () => {
  return useQuery({
    queryKey: ['user-locations'],
    queryFn: async () => {
      try {
        const result = await getUserLocations();

        if (!result.success) {
          throw new Error(result.error || '위치 정보를 불러올 수 없습니다.');
        }

        // Server Action 결과를 LocationType으로 변환
        return (result.data || []).map(
          (location: any): LocationType => ({
            locationId: location.id,
            locationName: location.location_name || '위치명 없음',
            IsPrimary: location.is_primary || false,
          })
        );
      } catch (error) {
        console.error('❌ useUserLocations 오류:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 1,
  });
};
