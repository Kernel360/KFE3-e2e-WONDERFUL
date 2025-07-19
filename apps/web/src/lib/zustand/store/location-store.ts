import { create } from 'zustand';

interface Location {
  locationId: string | null;
  locationName: string;
  IsPrimary: boolean;
}

interface LocationState {
  selectedLocation: Location;
  setLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: { locationId: null, locationName: '서울 강남구 역삼동', IsPrimary: false },
  setLocation: (location) => set({ selectedLocation: location }),
}));
