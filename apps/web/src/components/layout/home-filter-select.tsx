'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import { useUserLocations } from '@/hooks/queries/location/useUserLocations';

import { cn } from '@/lib/cn';
import { LocationType } from '@/lib/types/location';
import { useLocationStore } from '@/lib/zustand/store';

const HomeFilterSelect = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { selectedLocation, setLocation } = useLocationStore();

  // 실제 사용자 위치 데이터 조회
  const { data: userLocations, isLoading, error, refetch } = useUserLocations();

  // 위치명에서 마지막 "동"만 표시하는 함수
  const getDisplayName = (locationName: string) => {
    if (!locationName || typeof locationName !== 'string' || !locationName.trim()) {
      return '알 수 없음';
    }
    const parts = locationName.trim().split(' ');
    const lastPart = parts[parts.length - 1];
    return lastPart && lastPart.length > 0 ? lastPart : '알 수 없음';
  };

  const handleLocationChange = (location: LocationType) => {
    setLocation(location);
    setIsSelectOpen(false);
  };

  const handleRetry = () => {
    refetch();
  };

  // 초기 로드시 기본 위치 설정
  useEffect(() => {
    if (userLocations && userLocations.length > 0) {
      // 현재 선택된 위치가 없거나, 목록에 없는 경우에만 설정
      const isCurrentLocationValid = userLocations.some(
        (loc) => loc.locationId === selectedLocation.locationId
      );

      if (!selectedLocation.locationId || !isCurrentLocationValid) {
        // 기본 위치(IsPrimary=true)를 찾거나 첫 번째 위치를 설정
        const primaryLocation = userLocations.find((loc) => loc.IsPrimary);
        const defaultLocation = primaryLocation || userLocations[0];

        if (defaultLocation) {
          setLocation(defaultLocation);
        }
      }
    }
  }, [userLocations, selectedLocation.locationId, setLocation]);

  const homeFilterIcon = tv({
    base: 'transition-all duration-400',
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-360',
      },
    },
  });

  const homeFilterWrapper = cn('text-h4 flex h-10 items-center justify-between px-1 font-bold');

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={cn(homeFilterWrapper, 'gap-2')}>
        <div>loading...</div>
        <ChevronDown size={24} className="text-neutral-400" />
      </div>
    );
  }

  // 오류 상태
  if (error) {
    return (
      <button
        onClick={handleRetry}
        className={cn(homeFilterWrapper, 'gap-2 text-red-600 hover:text-red-700')}
        title={`오류: ${error.message}. 다시 시도하려면 클릭하세요`}
      >
        <MapPin size={16} />
        위치 오류
        <ChevronRight size={24} />
      </button>
    );
  }

  // 등록된 위치가 없는 경우
  if (!userLocations || userLocations.length === 0) {
    return (
      <Link href="/" className={cn(homeFilterWrapper, 'text-primary-600 gap-2')}>
        <MapPin size={16} />
        위치 설정
        <ChevronRight size={24} />
      </Link>
    );
  }

  // 등록된 위치가 있는 경우
  return (
    <Popover open={isSelectOpen} onOpenChange={setIsSelectOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="서비스 위치 선택"
          className={cn(homeFilterWrapper, 'hover:text-primary-600 gap-2 transition-colors')}
        >
          {getDisplayName(selectedLocation.locationName)}
          <ChevronDown size={24} className={homeFilterIcon({ open: isSelectOpen })} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-34">
        <ul className="space-y-3">
          {userLocations.map((location) => {
            const displayName = getDisplayName(location.locationName);

            return (
              <li key={location.locationId}>
                <button onClick={() => handleLocationChange(location)}>{displayName}</button>
              </li>
            );
          })}
          <li>
            {/* /위치설정 페이지로 이동 */}
            <Link href={'/location'}>내 동네 설정</Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default HomeFilterSelect;
