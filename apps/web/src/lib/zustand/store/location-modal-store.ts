import { create } from 'zustand';

import type { UserLocation } from '@/lib/types/location';

interface LocationModalState {
  isOpen: boolean;
  selectedLocation: UserLocation | null;
  selectedAddress: string;
  isSaving: boolean;
  saveError: string;

  // Actions
  openLocationModal: () => void;
  closeLocationModal: () => void;
  setSelectedLocation: (location: UserLocation, address: string) => void;
  setSaving: (saving: boolean) => void;
  setSaveError: (error: string) => void;
  reset: () => void;
}

export const useLocationModalStore = create<LocationModalState>((set, get) => ({
  // 상태
  isOpen: false,
  selectedLocation: null,
  selectedAddress: '',
  isSaving: false,
  saveError: '',

  // 액션들
  openLocationModal: () => set({ isOpen: true }),

  closeLocationModal: () =>
    set({
      isOpen: false,
      selectedLocation: null,
      selectedAddress: '',
      saveError: '',
    }),

  setSelectedLocation: (location: UserLocation, address: string) => {
    set({
      selectedLocation: location,
      selectedAddress: address,
      saveError: '', // 새로운 위치 선택 시 에러 초기화
    });
  },

  setSaving: (saving: boolean) => set({ isSaving: saving }),

  setSaveError: (error: string) => set({ saveError: error }),

  reset: () =>
    set({
      isOpen: false,
      selectedLocation: null,
      selectedAddress: '',
      isSaving: false,
      saveError: '',
    }),
}));
