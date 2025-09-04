import { createContext } from 'react';

export type ToastState = {
  isOpen: boolean,
  message: string,
  severity: 'success' | 'error' | 'info' | 'warning',
  closable?: boolean
};

type ToastContextType = {
  toast: ToastState
  closeToast: () => void;
  showToast: (message: string, severity: ToastState['severity'], closable?: boolean) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
