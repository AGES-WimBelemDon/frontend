import { createContext } from 'react';

export type ToastState = {
  isOpen: boolean,
  message: string,
  severity: 'success' | 'error' | 'info' | 'warning',
};

type ToastContextType = {
  toast: ToastState
  closeToast: () => void;
  showToast: (message: string, severity: ToastState['severity']) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
