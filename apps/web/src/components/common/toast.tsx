// apps/web/src/components/common/toast.tsx

'use client';

import { X } from 'lucide-react';

import { useToastStore } from '@/lib/zustand/store/toast-store';

const Toast = () => {
  const { toasts, closeToast } = useToastStore();

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

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex w-96 items-center justify-between rounded-md px-4 py-3 ${styles.container} `}
          >
            <div className="flex-1">
              <div className={`text-sm font-semibold ${styles.title}`}>{toast.title}</div>
              {toast.subtext && (
                <div className={`mt-1 text-xs ${styles.subtext}`}>{toast.subtext}</div>
              )}
            </div>

            {toast.status !== 'notice' && (
              <button
                onClick={() => closeToast(toast.id)}
                className={`ml-3 flex h-7 w-7 items-center justify-center rounded-full transition-colors ${styles.closeBtn} `}
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
