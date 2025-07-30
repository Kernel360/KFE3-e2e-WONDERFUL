import { useQueryClient } from '@tanstack/react-query';
import { createAccount } from '@/lib/actions/account';
import type { CreateAccountRequest } from '@/lib/types/account';
import { useState } from 'react';
import { toast } from 'sonner';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutateAsync = async (data: CreateAccountRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createAccount(data);

      if (result.error) {
        throw new Error(result.error);
      }

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast.success('계좌가 등록되었습니다.');

      return result.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '계좌 등록에 실패했습니다.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutateAsync,
    isLoading,
    error,
    reset: () => {
      setError(null);
    },
  };
};
