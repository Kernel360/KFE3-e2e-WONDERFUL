import { create } from 'zustand';

interface LocationState {
  selectedLocationId: string | null;
  selectedLocationName: string;
  setLocation: (locationId: string | null, locationName: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocationId: null,
  selectedLocationName: '전체',
  setLocation: (locationId, locationName) =>
    set({
      selectedLocationId: locationId,
      selectedLocationName: locationName,
    }),
}));
