import { create } from 'zustand';

import { LocationType } from '@/types/location';

interface LocationState {
  selectedLocation: LocationType;
  setLocation: (location: LocationType) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: { locationId: null, locationName: '서울 강남구 역삼동', IsPrimary: false },
  setLocation: (location) => set({ selectedLocation: location }),
}));
