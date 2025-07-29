'use client';

import { useState } from 'react';

import { Check, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';

import { useUserLocations } from '@/hooks/queries/location/useUserLocations';

import { deleteLocation, setPrimaryLocation } from '@/lib/actions/location';
import { useToastStore } from '@/lib/zustand/store';

interface ButtonBoxProps {
  locationId: string;
  isPrimary?: boolean;
}

const LocationButtonBox = ({ locationId, isPrimary = false }: ButtonBoxProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);
  const { refetch } = useUserLocations();
  const { showToast } = useToastStore();

  // 기본 위치 설정 함수
  const handleSetPrimary = async () => {
    setIsSettingPrimary(true);
    try {
      const result = await setPrimaryLocation(locationId);
      if (result.success) {
        await refetch();
        showToast({
          status: 'success',
          title: '기본 위치 설정 완료',
          subtext: result.message || '기본 위치가 변경되었습니다.',
          autoClose: true,
        });
      } else {
        showToast({
          status: 'error',
          title: '기본 위치 설정 실패',
          subtext: result.error || '기본 위치 설정에 실패했습니다.',
          autoClose: true,
        });
      }
    } catch (error) {
      showToast({
        status: 'error',
        title: '기본 위치 설정 오류',
        subtext: '예상치 못한 오류가 발생했습니다.',
        autoClose: true,
      });
    } finally {
      setIsSettingPrimary(false);
    }
  };

  // 삭제 함수
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteLocation(locationId);
      if (result.success) {
        await refetch();
        showToast({
          status: 'success',
          title: '위치 삭제 완료',
          subtext: result.message || '위치가 성공적으로 삭제되었습니다.',
          autoClose: true,
        });
      } else {
        showToast({
          status: 'error',
          title: '위치 삭제 실패',
          subtext: result.error || '위치 삭제에 실패했습니다.',
          autoClose: true,
        });
      }
    } catch (error) {
      showToast({
        status: 'error',
        title: '위치 삭제 오류',
        subtext: '예상치 못한 오류가 발생했습니다.',
        autoClose: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleSetPrimary}
        disabled={isSettingPrimary || isPrimary}
        className={`flex size-10 items-center justify-center ${
          isPrimary ? 'cursor-default' : 'hover:text-primary-500'
        }`}
      >
        <Check
          size={20}
          className={`hover:text-primary-500 text-neutral-600 ${
            isPrimary ? 'text-primary-500' : isSettingPrimary ? 'animate-pulse' : ''
          }`}
        />
      </button>
      <Button
        variant="solid"
        color="transparent"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting || isPrimary}
        className={`${
          isPrimary
            ? 'cursor-not-allowed opacity-30'
            : 'hover:[&_svg]:text-danger-500 disabled:opacity-50'
        }`}
      >
        <Trash2
          size={20}
          className={`text-neutral-600 ${
            isPrimary ? 'text-neutral-300' : isDeleting ? 'animate-pulse' : ''
          }`}
        />
      </Button>
    </div>
  );
};

export default LocationButtonBox;
