'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

import { cn } from '@/lib/cn';
import { LOCATION_DUMMY } from '@/lib/constants/location-list';
import { LocationType } from '@/lib/types/location';
import { useLocationStore } from '@/lib/zustand/store';

/** Todo
 * 1. 등록된 위치가 없을 경우 : 강남구 역삼동으로 설정 -> 버튼 클릭시 바로 내 동네 설정 페이지로 이동
 * 2. 등록된 위치가 있을 경우 : 최대 3개까지 등록가능 + 내 동네 설정 이동
 * 3. 전역상태로 업데이트 후 List가 전달받게끔
 */

const HomeFilterSelect = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [locationList, setLocationList] = useState<LocationType[] | []>([]);

  const { selectedLocation, setLocation } = useLocationStore();
  const phaseName = selectedLocation.locationName.split(' ').at(-1);

  const handleLocateChange = (locate: LocationType) => {
    setLocation(locate);
    setIsSelectOpen(false);
    return;
  };

  useEffect(() => {
    // 저장된 위치 정보가 없으면 기본 설정
    if (locationList.length > 0) return;

    // (수정 필요) 저장된 위치 정보가 있으면 저장된 위치 정보로 설정
    const results: LocationType[] = LOCATION_DUMMY;
    setLocationList(results);

    const primaryLocation = results.find((locate) => locate.IsPrimary) ?? results[0];
    setLocation(primaryLocation!);
  }, [selectedLocation, setLocation, locationList.length]);

  const homeFilterIcon = tv({
    base: 'transition-all duration-400',
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-360',
      },
    },
  });

  const homeFilterWrapper = cn(
    'text-h4 flex h-10 w-34 items-center justify-between px-1 font-bold hover:bg-neutral-50'
  );

  return (
    <>
      {locationList.length >= 1 ? (
        <Popover open={isSelectOpen} onOpenChange={setIsSelectOpen}>
          <PopoverTrigger asChild>
            <button aria-label="서비스 위치 선택" className={homeFilterWrapper}>
              {phaseName}
              <ChevronDown size={24} className={homeFilterIcon({ open: isSelectOpen })} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-34">
            <ul className="space-y-3">
              {locationList.map((locate) => {
                const locateName = locate.locationName.split(' ').at(-1);
                return (
                  <li key={locate.locationId}>
                    <button onClick={() => handleLocateChange(locate)}>{locateName}</button>
                  </li>
                );
              })}
              <li>
                {/* /위치설정 페이지로 이동 */}
                <Link href={'/'}>내 동네 설정</Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        // 위치설정 페이지로 이동
        <Link href={'/'} className={homeFilterWrapper}>
          {phaseName}
          <ChevronRight size={24} />
        </Link>
      )}
    </>
  );
};

export default HomeFilterSelect;
