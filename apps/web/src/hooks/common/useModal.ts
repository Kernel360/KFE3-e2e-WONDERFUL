'use client';

import { useState, useCallback } from 'react';

export interface ModalItem {
  id: string;
  data?: any;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface UseModalReturn {
  modalStack: ModalItem[];
  openModal: (id: string, options: Omit<ModalItem, 'id'>) => void;
  closeModal: (id: string) => void;
  closeTopModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  const openModal = useCallback((id: string, options: Omit<ModalItem, 'id'>) => {
    setModalStack((prev) => [
      ...prev,
      {
        id,
        showCloseButton: false,
        ...options,
      },
    ]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModalStack((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeTopModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  return {
    modalStack, // 현재 열려있는 모달들의 배열
    openModal, // 새로운 모달을 열기
    closeModal, // 특정 ID의 모달 닫기
    closeTopModal, // 최상위 모달 닫기 (뒤로가기)
  };
};
