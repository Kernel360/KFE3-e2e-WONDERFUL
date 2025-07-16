'use client';

import React, { useEffect } from 'react';

import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { ModalItem } from '@/hooks/common/useModal';

export interface ModalProps {
  modalStack: ModalItem[];
  onCloseModal: (id: string) => void;
  children: (modal: ModalItem) => React.ReactNode;
}

const Modal = ({ modalStack, onCloseModal, children }: ModalProps) => {
  // body 스크롤 방지
  useEffect(() => {
    if (modalStack.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalStack.length]);

  if (modalStack.length === 0) return null;

  const modalsContent = modalStack.map((modal, index) => {
    const zIndex = 50 + index;

    const styles = {
      container: 'fixed inset-0 flex items-end justify-center',
      modal: `w-full max-w-md h-full bg-white ${modal.className || ''}`,
    };

    return (
      <div key={modal.id} className={styles.container} style={{ zIndex }}>
        {/* 모달 컨테이너 */}
        <div className={`relative ${styles.modal}`}>
          {/* 닫기 버튼 */}
          {modal.showCloseButton !== false && (
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={() => onCloseModal(modal.id)}
                className="rounded-full bg-black/20 p-2 text-white transition-colors hover:bg-black/40"
                aria-label="모달 닫기"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* 컨텐츠 */}
          <div className="h-full">{children(modal)}</div>
        </div>
      </div>
    );
  });

  return createPortal(<>{modalsContent}</>, document.body);
};

export default Modal;
