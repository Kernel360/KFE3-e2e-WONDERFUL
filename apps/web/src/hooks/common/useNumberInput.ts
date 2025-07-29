import { useCallback } from 'react';

interface UseNumberInputProps {
  min?: number;
  max?: number;
}

export const useNumberInput = ({ min = 0, max = 2000000000 }: UseNumberInputProps = {}) => {
  const handleNumberInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // 모든 브라우저에서 숫자만 허용
      let value = e.currentTarget.value.replace(/[^0-9]/g, '');

      // 빈 값이면 그대로 두기
      if (value === '') {
        e.currentTarget.value = '';
        return;
      }

      // 숫자로 변환하여 범위 체크
      const numValue = parseInt(value);

      // 최소값 체크
      if (numValue < min) {
        // 최소값보다 작으면 그대로 두고 서버에서 검증
      }

      // 최대값 체크
      if (numValue > max) {
        value = max.toString();
      }

      e.currentTarget.value = value;
    },
    [min, max]
  );

  const handleNumberKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // 모든 브라우저에서 일관된 동작
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
      'Enter',
    ];

    // Ctrl/Cmd 조합키 허용
    if (e.ctrlKey || e.metaKey) return;

    // 숫자와 허용된 키만 통과
    if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleNumberPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      // 모든 브라우저에서 일관된 붙여넣기 처리
      e.preventDefault();
      const paste = e.clipboardData.getData('text');
      const numericValue = paste.replace(/[^0-9]/g, '');

      if (numericValue) {
        const value = Math.min(Math.max(parseInt(numericValue), min), max);
        e.currentTarget.value = value.toString();
      }
    },
    [min, max]
  );

  return {
    handleNumberInput,
    handleNumberKeyDown,
    handleNumberPaste,
  };
};
