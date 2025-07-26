'use client';

import { useState } from 'react';

import { Check, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';

import { useUserLocations } from '@/hooks/queries/location/useUserLocations';

import { deleteLocation, setPrimaryLocation } from '@/lib/actions/location';

interface ButtonBoxProps {
  locationId: string;
}

const LocationButtonBox = ({ locationId }: ButtonBoxProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);
  const { refetch } = useUserLocations();

  // 기본 위치 설정 함수
  const handleSetPrimary = async () => {
    setIsSettingPrimary(true);
    try {
      const result = await setPrimaryLocation(locationId);
      if (result.success) {
        await refetch();
      } else {
        console.error('❌ 기본 위치 설정 실패:', result.error);
      }
    } catch (error) {
      console.error('❌ 기본 위치 설정 오류:', error);
    } finally {
      setIsSettingPrimary(false);
    }
  };

  // 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm('이 위치를 삭제하시겠습니까?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteLocation(locationId);
      if (result.success) {
        await refetch();
      } else {
        console.error('❌ 위치 삭제 실패:', result.error);
      }
    } catch (error) {
      console.error('❌ 위치 삭제 오류:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleSetPrimary}
        disabled={isSettingPrimary}
        className="flex size-10 items-center justify-center disabled:opacity-50"
        title="기본 위치로 설정"
      >
        <Check
          size={20}
          className={`hover:text-primary-500 text-neutral-600 ${
            isSettingPrimary ? 'animate-pulse' : ''
          }`}
        />
      </button>
      <Button
        variant="solid"
        color="transparent"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="hover:[&_svg]:text-danger-500 disabled:opacity-50"
        title="위치 삭제"
      >
        <Trash2 size={20} className={`text-neutral-600 ${isDeleting ? 'animate-pulse' : ''}`} />
      </Button>
    </div>
  );
};

export default LocationButtonBox;
