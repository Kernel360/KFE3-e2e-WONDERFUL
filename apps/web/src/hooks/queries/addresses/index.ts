import { useQuery } from '@tanstack/react-query';
import { getAddresses } from '@/lib/actions/address';

// 주소 목록 조회
export const useAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const result = await getAddresses();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};
