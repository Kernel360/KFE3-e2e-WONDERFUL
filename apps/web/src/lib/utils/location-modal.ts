import type { UserLocation } from '@/lib/types/location';
import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';

/**
 * 어디서든 호출 가능한 위치 모달 함수들
 */

/**
 * 위치 선택 모달을 엽니다
 * @param onLocationSelect 위치 선택 시 실행될 콜백
 * @param onClose 모달 닫힐 때 실행될 콜백 (선택적)
 */
export const openLocationModal = (
  onLocationSelect?: (location: UserLocation, address: string) => void,
  onClose?: () => void
) => {
  const { openLocationModal } = useLocationModalStore.getState();
  openLocationModal(onLocationSelect, onClose);
};

/**
 * 위치 모달을 닫습니다
 */
export const closeLocationModal = () => {
  const { closeLocationModal } = useLocationModalStore.getState();
  closeLocationModal();
};

/**
 * 간단한 위치 선택 (Promise 기반)
 * @returns Promise<{location: UserLocation, address: string}>
 */
export const selectLocation = (): Promise<{ location: UserLocation; address: string }> => {
  return new Promise((resolve, reject) => {
    openLocationModal(
      (location, address) => {
        resolve({ location, address });
      },
      () => {
        reject(new Error('위치 선택이 취소되었습니다.'));
      }
    );
  });
};

/**
 * React 컴포넌트에서 사용할 훅
 */
export const useLocationModal = () => {
  return {
    openLocationModal,
    closeLocationModal,
    selectLocation,
  };
};
