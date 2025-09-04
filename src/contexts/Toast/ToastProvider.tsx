import { useState } from 'react';

import { ToastContext, type ToastState } from './ToastContext';

export function ToastProvider({children} : {children: React.ReactNode}) {
  const [toastState, setToastState] = useState<ToastState>(
    {
      isOpen: false,
      message: '',
      severity: 'info'
    }
  );

  const showToast = (message: string, severity: ToastState['severity'], closable?: boolean) => {
    setToastState({
      isOpen: true,
      message,
      severity,
      closable
    });
  };

  const closeToast = () => {
    setToastState((prev) => ({  ...prev, isOpen: false }));
  };
  return (
    <ToastContext.Provider value={{toast: toastState, closeToast, showToast}}>
      {children}
    </ToastContext.Provider>
  );

}