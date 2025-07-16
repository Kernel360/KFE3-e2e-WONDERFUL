'use client';

import { useState, useCallback } from 'react';

export interface ModalItem {
  id: string;
  type: 'fullscreen' | 'bottom';
  data?: any;
  height?: string | number;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export interface UseModalReturn {
  modalStack: ModalItem[];
  openModal: (id: string, options: Omit<ModalItem, 'id'>) => void;
  closeModal: (id: string) => void;
  replaceModal: (oldId: string, newId: string, options: Omit<ModalItem, 'id'>) => void;
  closeTopModal: () => void;
  closeAllModals: () => void;
  isModalOpen: (id: string) => boolean;
  getModalData: (id: string) => any;
  getTopModal: () => ModalItem | null;
}

export const useModal = (): UseModalReturn => {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);

  const openModal = useCallback((id: string, options: Omit<ModalItem, 'id'>) => {
    setModalStack((prev) => [
      ...prev,
      {
        id,
        ...options,
      },
    ]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModalStack((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const replaceModal = useCallback(
    (oldId: string, newId: string, options: Omit<ModalItem, 'id'>) => {
      setModalStack((prev) => {
        const index = prev.findIndex((modal) => modal.id === oldId);
        if (index === -1) return prev;

        const newStack = [...prev];
        newStack[index] = {
          id: newId,
          ...options,
        };
        return newStack;
      });
    },
    []
  );

  const closeTopModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  const closeAllModals = useCallback(() => {
    setModalStack([]);
  }, []);

  const isModalOpen = useCallback(
    (id: string) => {
      return modalStack.some((modal) => modal.id === id);
    },
    [modalStack]
  );

  const getModalData = useCallback(
    (id: string) => {
      const modal = modalStack.find((modal) => modal.id === id);
      return modal?.data || null;
    },
    [modalStack]
  );

  const getTopModal = useCallback(() => {
    return modalStack[modalStack.length - 1] || null;
  }, [modalStack]);

  return {
    modalStack,
    openModal,
    closeModal,
    replaceModal,
    closeTopModal,
    closeAllModals,
    isModalOpen,
    getModalData,
    getTopModal,
  };
};
