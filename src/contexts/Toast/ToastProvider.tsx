import { useState, type PropsWithChildren } from 'react';

import { ToastContext } from './ToastContext';
import type { ToastState } from '../../components/Toast/interface';

export function ToastProvider({ children }: PropsWithChildren) {
  const [toastState, setToastState] = useState<ToastState>({
    isOpen: false,
    message: '',
    severity: 'info'
  });

  function showToast(
    message: ToastState['message'],
    severity: ToastState['severity'],
    closable?: ToastState['closable']
  ) {
    setToastState({
      isOpen: true,
      message,
      severity,
      closable
    });
  };

  function closeToast() {
    setToastState((prev) => ({  ...prev, isOpen: false }));
  };

  return (
    <ToastContext.Provider value={{ toast: toastState, closeToast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}
