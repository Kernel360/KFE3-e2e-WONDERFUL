import { create } from 'zustand';

import type { UserLocation } from '@/lib/types/location';

interface LocationModalState {
  isOpen: boolean;
  onLocationSelect?: (location: UserLocation, address: string) => void;
  onClose?: () => void;
  selectedLocation: UserLocation | null;
  selectedAddress: string;
}

interface LocationModalActions {
  openLocationModal: (
    onLocationSelect?: (location: UserLocation, address: string) => void,
    onClose?: () => void
  ) => void;
  closeLocationModal: () => void;
  setSelectedLocation: (location: UserLocation, address: string) => void;
  resetModal: () => void;
}

type LocationModalStore = LocationModalState & LocationModalActions;

export const useLocationModalStore = create<LocationModalStore>((set, get) => ({
  // 상태
  isOpen: false,
  onLocationSelect: undefined,
  onClose: undefined,
  selectedLocation: null,
  selectedAddress: '',

  // 액션들
  openLocationModal: (onLocationSelect, onClose) => {
    set({
      isOpen: true,
      onLocationSelect,
      onClose,
      selectedLocation: null,
      selectedAddress: '',
    });
  },

  closeLocationModal: () => {
    const { onClose } = get();
    set({
      isOpen: false,
      onLocationSelect: undefined,
      onClose: undefined,
      selectedLocation: null,
      selectedAddress: '',
    });
    onClose?.();
  },

  setSelectedLocation: (location, address) => {
    const { onLocationSelect } = get();
    set({
      selectedLocation: location,
      selectedAddress: address,
    });

    // 콜백 실행
    onLocationSelect?.(location, address);

    // 성공 알림
    alert(
      `위치가 설정되었습니다!\n${address}\n위도: ${location.latitude}, 경도: ${location.longitude}`
    );

    // 모달 닫기
    get().closeLocationModal();
  },

  resetModal: () => {
    set({
      isOpen: false,
      onLocationSelect: undefined,
      onClose: undefined,
      selectedLocation: null,
      selectedAddress: '',
    });
  },
}));
