import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createAccount } from '@/lib/actions/account';
import type { CreateAccountRequest } from '@/lib/types/account';

// 계좌 등록
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

      return result.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '계좌 등록에 실패했습니다.';
      setError(errorMessage);
      console.error('계좌 등록 실패:', error);
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
