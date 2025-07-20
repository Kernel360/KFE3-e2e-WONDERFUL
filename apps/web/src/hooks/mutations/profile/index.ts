import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

        toast.success('프로필이 수정 되었습니다.');
        router.push('/profile');
      } else {
        toast.error(result.error || '프로필 수정에 실패했습니다.');
      }
    },
    onError: (error) => {
      toast.error('프로필 수정 중 오류가 발생했습니다.');
      console.error('프로필 수정 에러:', error as Error);
    },
  });
};
