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

    // 오버레이 클릭으로 모달 닫기
    const handleOverlayClick = (event: React.MouseEvent) => {
      if (modal.closeOnOverlayClick !== false && event.target === event.currentTarget) {
        onCloseModal(modal.id);
      }
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // 표준화: non-fullscreen 모달에 대해서만 전파를 중지합니다.
      if (modal.type !== 'fullscreen') {
        e.stopPropagation();
      }
      // 선택적으로, 향후 모달 유형에 대한 추가 로직을 여기에 추가합니다.
    };

    // 모달 타입별 스타일
    const getModalStyles = () => {
      switch (modal.type) {
        case 'fullscreen':
          return {
            container: 'fixed inset-0 flex items-end justify-center',
            modal: `w-full max-w-md h-full bg-white ${modal.className || ''}`,
            showOverlay: false,
          };
        case 'bottom':
          return {
            container: 'fixed inset-0 flex items-end justify-center',
            modal: `w-full max-w-md rounded-t-3xl bg-white ${modal.className || ''}`,
            showOverlay: true,
            height: modal.height || '560px',
          };
      }
    };

    const styles = getModalStyles();

    return (
      <div key={modal.id} className={styles.container} style={{ zIndex }}>
        {/* 오버레이 */}
        {styles.showOverlay && (
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />
        )}

        {/* 모달 컨테이너 */}
        <div
          className={`relative ${styles.modal}`}
          style={{
            height: styles.height || (modal.type === 'fullscreen' ? '100%' : undefined),
          }}
          onClick={handleContainerClick}
        >
          {/* 헤더 (fullscreen이 아니고 showCloseButton이 true인 경우) */}
          {modal.type !== 'fullscreen' && modal.showCloseButton !== false && (
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => onCloseModal(modal.id)}
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
                aria-label="모달 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* fullscreen용 닫기 버튼 */}
          {modal.type === 'fullscreen' && modal.showCloseButton !== false && (
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
          <div className={modal.type === 'fullscreen' ? 'h-full' : 'flex-1'}>{children(modal)}</div>
        </div>
      </div>
    );
  });

  return createPortal(<>{modalsContent}</>, document.body);
};

export default Modal;
