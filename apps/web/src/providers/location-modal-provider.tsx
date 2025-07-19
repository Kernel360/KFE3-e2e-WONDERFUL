'use client';

import React from 'react';

import LocationSearchForm from '@/components/location/location-search-form';
import Modal from '@/components/ui/modal';

import { useModal } from '@/hooks/common/useModal';

import { useLocationModalStore } from '@/lib/zustand/store/location-modal-store';

/**
 * 전역에서 사용할 위치 모달 프로바이더
 * 앱의 최상위에 한 번만 배치하면 됨
 */
const LocationModalProvider = () => {
  const { modalStack, openModal, closeModal } = useModal();
  const { isOpen, closeLocationModal, setSelectedLocation } = useLocationModalStore();

  // Zustand 상태와 useModal 동기화
  React.useEffect(() => {
    if (isOpen && modalStack.length === 0) {
      openModal('location-modal', {
        className: 'rounded-t-2xl',
        closeOnOverlayClick: false,
      });
    } else if (!isOpen && modalStack.length > 0) {
      closeModal('location-modal');
    }
  }, [isOpen, modalStack.length, openModal, closeModal]);

  const handleCloseModal = (id: string) => {
    if (id === 'location-modal') {
      closeLocationModal();
    }
    closeModal(id);
  };

  const handleLocationSelect = (location: any, address: string) => {
    setSelectedLocation(location, address);
  };

  const renderModalContent = (modal: any) => {
    if (modal.id === 'location-modal') {
      return (
        <LocationSearchForm
          onLocationSelect={handleLocationSelect}
          onClose={() => handleCloseModal('location-modal')}
        />
      );
    }
    return null;
  };

  return (
    <Modal modalStack={modalStack} onCloseModal={handleCloseModal}>
      {renderModalContent}
    </Modal>
  );
};

export default LocationModalProvider;
