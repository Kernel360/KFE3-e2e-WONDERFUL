import { create } from 'zustand';

interface LocationModalState {
  isOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}

export const useLocationModalStore = create<LocationModalState>((set) => ({
  isOpen: false,
  openLocationModal: () => set({ isOpen: true }),
  closeLocationModal: () => set({ isOpen: false }),
}));
