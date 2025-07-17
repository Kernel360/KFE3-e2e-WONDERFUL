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
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalStack.length]);

  if (modalStack.length === 0) return null;

  const modalsContent = modalStack.map((modal, index) => {
    const zIndex = 50 + index;

    return (
      <div
        key={modal.id}
        className="fixed inset-0 flex items-end justify-center"
        style={{ zIndex }}
      >
        {/* 모달 컨테이너 */}
        <div className={`relative h-full w-full max-w-md bg-white ${modal.className || ''}`}>
          {/* 닫기 버튼 - showCloseButton이 true일 때만 표시 */}
          {modal.showCloseButton && (
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
