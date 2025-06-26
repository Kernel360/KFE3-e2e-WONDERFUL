// 특정 요소 외부에서 클릭 이벤트가 발생했을 때 지정된 콜백 함수를 실행
// 주로 모달, 드롭다운 등에서 사용
import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const onMousedown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', onMousedown);
    return () => {
      document.removeEventListener('mousedown', onMousedown);
    };
  }, [ref, onClickOutside]);
};
