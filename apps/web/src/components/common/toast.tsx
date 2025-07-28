'use client';

import { useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';

import { useToastStore } from '@/lib/zustand/store';

const Toast = () => {
  const { toasts, closeToast } = useToastStore();
  const [visibleToasts, setVisibleToasts] = useState<string[]>([]);

  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map()); // 타이머 관리용 ref 추가

  useEffect(() => {
    const currentToastIds = toasts.map((toast) => toast.id);

    // 새로 추가된 토스트 찾기
    const newToastIds = currentToastIds.filter((id) => !visibleToasts.includes(id));

    // 제거된 토스트의 타이머 정리
    timersRef.current.forEach((timer, id) => {
      if (!currentToastIds.includes(id)) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    });

    if (newToastIds.length > 0) {
      // 새 토스트 즉시 표시
      setTimeout(() => {
        setVisibleToasts((current) => [...current, ...newToastIds]);
      }, 10);

      // 각 새 토스트에 대해 3초 타이머 설정
      newToastIds.forEach((id) => {
        const timer = setTimeout(() => {
          handleClose(id);
        }, 3000);

        timersRef.current.set(id, timer); // 타이머 저장
      });
    }

    // 제거된 토스트는 visibleToasts에서도 제거
    setVisibleToasts((prev) => prev.filter((id) => currentToastIds.includes(id)));
  }, [toasts]);

  // 컴포넌트 언마운트 시에만 정리하는 별도 useEffect 추가
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const handleClose = (id: string) => {
    // 타이머 정리
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    setVisibleToasts((prev) => prev.filter((toastId) => toastId !== id));
    setTimeout(() => {
      closeToast(id);
    }, 300);
  };

  const getToastStyles = (status: string) => {
    const styles = {
      success: {
        container: 'bg-white shadow-[0px_6px_12px_-3px_rgba(39,116,255,0.12)]',
        title: 'text-primary-500',
        subtext: 'text-neutral-600',
        closeBtn: 'bg-primary-50 text-primary-500 hover:bg-primary-100',
      },
      error: {
        container: 'bg-white shadow-[0px_6px_12px_-3px_rgba(255,76,0,0.12)]',
        title: 'text-secondary-600',
        subtext: 'text-neutral-500',
        closeBtn: 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100',
      },
      notice: {
        container: 'bg-neutral-900 shadow-[0px_6px_12px_-3px_rgba(82,82,82,0.12)]',
        title: 'text-neutral-200',
        subtext: '',
        closeBtn: '',
      },
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="pointer-events-none fixed left-1/2 top-10 z-[9999] -translate-x-1/2 space-y-2">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.status);
        const isVisible = visibleToasts.includes(toast.id);

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-96 items-center justify-between rounded-md px-4 py-3 ${styles.container} transform transition-all duration-300 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
          >
            <div className="flex-1">
              <div className={`text-sm font-semibold ${styles.title}`}>{toast.title}</div>
              {toast.subtext && (
                <div className={`mt-1 text-xs ${styles.subtext}`}>{toast.subtext}</div>
              )}
            </div>

            {toast.status !== 'notice' && (
              <button
                onClick={() => handleClose(toast.id)}
                className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${styles.closeBtn}`}
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
