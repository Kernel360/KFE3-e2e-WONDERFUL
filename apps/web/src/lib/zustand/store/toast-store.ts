// apps/web/src/lib/zustand/store/toast-store.ts

import { create } from 'zustand';

export type ToastStatus = 'success' | 'error' | 'notice';

export interface ToastItem {
  id: string;
  status: ToastStatus;
  title: string;
  subtext?: string;
  autoClose?: boolean;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  closeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  showToast: (toast) => {
    const id = Date.now().toString(); // timestamp로 unique id
    set({ toasts: [...get().toasts, { ...toast, id }] });
    // autoClose true면 3초 뒤 자동 삭제
    if (toast.autoClose !== false) {
      setTimeout(() => get().closeToast(id), 3000);
    }
  },
  closeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
