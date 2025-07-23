import { BadgePrimary } from '@/components/personal-info';

import { LocationType } from '@/lib/types/location';

interface LocationItemProps {
  location: LocationType;
  children: React.ReactNode;
}

const LocationItem = ({ location, children }: LocationItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-neutral-900">{location.locationName}</h3>
          {location.IsPrimary && <BadgePrimary />}
        </div>
        <p className="text-sm text-neutral-600">
          {location.locationName.split(' ').slice(0, -1).join(' ')}
        </p>
      </div>
      {children}
    </div>
  );
};

export default LocationItem;
