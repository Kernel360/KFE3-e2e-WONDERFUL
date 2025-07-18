'use client';

import React, { useState } from 'react';

import LocationSearchForm from '@/components/location/location-search-form';
import Modal from '@/components/ui/modal';

import { useModal } from '@/hooks/common/useModal';

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface LocationSetModalProps {
  onLocationSelect?: (location: UserLocation, address: string) => void;
}

const LocationRegistrationModal = ({ onLocationSelect }: LocationSetModalProps) => {
  const { modalStack, openModal, closeModal } = useModal();
  const [selectedLocation, setSelectedLocation] = useState<UserLocation | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleOpenModal = () => {
    openModal('location-registration', {
      className: 'rounded-t-2xl',
      closeOnOverlayClick: false,
    });
  };

  const handleCloseModal = (id: string) => {
    closeModal(id);
    setSelectedLocation(null);
    setSelectedAddress('');
  };

  const handleLocationSelect = (location: UserLocation, address: string) => {
    setSelectedLocation(location);
    setSelectedAddress(address);

    console.log('위치 설정 완료:', { location, address });

    // 부모 컴포넌트에 선택된 위치 전달
    onLocationSelect?.(location, address);

    // 성공 알림
    alert(
      `위치가 설정되었습니다!\n${address}\n위도: ${location.latitude}, 경도: ${location.longitude}`
    );

    // 모달 닫기
    handleCloseModal('location-registration');
  };

  const renderModalContent = (modal: any) => {
    if (modal.id === 'location-registration') {
      return (
        <LocationSearchForm
          onLocationSelect={handleLocationSelect}
          onClose={() => handleCloseModal('location-registration')}
        />
      );
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-md p-8">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">위치 등록 시스템</h1>
          <p className="text-neutral-600">카카오 API + 지오로케이션 통합</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="w-full rounded-lg bg-blue-600 px-6 py-4 font-medium text-white transition-colors hover:bg-blue-700"
        >
          📍 위치 정보 설정하기
        </button>

        {selectedLocation && selectedAddress && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="mb-1 text-sm font-medium text-green-900">✅ 설정된 위치:</p>
            <p className="text-sm text-green-800">{selectedAddress}</p>
            <p className="mt-1 text-xs text-green-600">
              위도: {selectedLocation.latitude.toFixed(6)}, 경도:{' '}
              {selectedLocation.longitude.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      {/* Modal 컴포넌트 사용 */}
      <Modal modalStack={modalStack} onCloseModal={handleCloseModal}>
        {renderModalContent}
      </Modal>
    </div>
  );
};

export default LocationRegistrationModal;
