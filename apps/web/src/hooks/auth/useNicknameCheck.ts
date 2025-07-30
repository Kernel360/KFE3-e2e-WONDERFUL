import { useCallback, useState } from 'react';

import { checkNickname } from '@/lib/api/nickname';

interface UseNicknameCheckReturn {
  isChecking: boolean;
  checkResult: {
    available: boolean;
    message: string;
  } | null;
  checkNicknameAvailability: (nickname: string) => Promise<boolean>;
  clearCheckResult: () => void;
}

export const useNicknameCheck = (): UseNicknameCheckReturn => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const checkNicknameAvailability = useCallback(async (nickname: string): Promise<boolean> => {
    // 빈 값이거나 너무 짧으면 검사하지 않음
    if (!nickname.trim() || nickname.trim().length < 2) {
      setCheckResult({
        available: false,
        message: '닉네임은 2자 이상이어야 합니다.',
      });
      return false;
    }

    setIsChecking(true);

    try {
      const result = await checkNickname(nickname);
      setCheckResult(result);
      return result.available;
    } catch (error) {
      console.error('닉네임 확인 에러:', error);
      setCheckResult({
        available: false,
        message: '닉네임 확인 중 오류가 발생했습니다.',
      });
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const clearCheckResult = useCallback(() => {
    setCheckResult(null);
  }, []);

  return {
    isChecking,
    checkResult,
    checkNicknameAvailability,
    clearCheckResult,
  };
};
