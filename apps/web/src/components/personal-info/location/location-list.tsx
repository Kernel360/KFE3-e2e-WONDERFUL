'use client';

import { LocationItem, LocationButtonBox, LocationButtonCreate } from '@/components/personal-info';

import { useUserLocations } from '@/hooks/queries/location/useUserLocations';

const LocationList = () => {
  const { data: userLocations, isLoading, error } = useUserLocations();
  const status = userLocations && userLocations.length >= 3 ? 'disabled' : 'default';

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>위치 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-600">오류가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  if (!userLocations || userLocations.length === 0) {
    return (
      <div className="flex h-full w-full flex-col justify-between px-4 pb-4">
        <div className="flex flex-col items-center justify-center py-16">
          <h3 className="mb-2 text-lg font-medium text-neutral-900">등록된 위치가 없습니다</h3>
          <p className="text-center text-neutral-600">
            위치를 등록하시면
            <br />
            해당 지역의 경매 정보를 확인할 수 있습니다
          </p>
        </div>
        <LocationButtonCreate status={status}>위치 추가하기</LocationButtonCreate>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col justify-between px-4 pb-4">
      <ul className="flex flex-col gap-3">
        {userLocations?.map((location) => (
          <li key={location.locationId}>
            <LocationItem location={location}>
              <LocationButtonBox locationId={location.locationId!} isPrimary={location.IsPrimary} />
            </LocationItem>
          </li>
        ))}
      </ul>
      <LocationButtonCreate status={status}>위치 추가하기</LocationButtonCreate>
    </div>
  );
};

export default LocationList;
