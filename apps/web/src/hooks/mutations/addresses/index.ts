import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress, updateAddress, deleteAddress } from '@/lib/actions/address';
import type { CreateAddressRequest } from '@/lib/types/address';
import { toast } from 'sonner';

// 주소 생성 mutation
export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAddressRequest) => {
      const result = await createAddress(data);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('주소가 등록되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '주소 등록에 실패했습니다.');
    },
  });
};

// 주소 수정 mutation
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateAddressRequest> }) => {
      const result = await updateAddress(id, data);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('주소가 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '주소 수정에 실패했습니다.');
    },
  });
};

// 주소 삭제 mutation
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteAddress(id);
      if (result.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('주소가 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '주소 삭제에 실패했습니다.');
    },
  });
};
