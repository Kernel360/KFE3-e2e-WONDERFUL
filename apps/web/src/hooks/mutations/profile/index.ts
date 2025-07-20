import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '@/lib/actions/profile';
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (result) => {
      if (result.success) {
        // 프로필 업데이트 성공 시, 캐시 무효화
        queryClient.invalidateQueries({
          queryKey: ['profile', 'me'],
        });

        router.push('/profile');
      }
    },
    onError: (error) => {
      console.error('프로필 수정 에러:', error as Error);
    },
  });
};
