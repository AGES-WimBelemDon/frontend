import { createContext } from 'react';

import type { ToastState } from '../../components/Toast/interface';

type ToastContextType = {
  toast: ToastState
  closeToast: () => void;
  showToast: (message: ToastState['message'], severity: ToastState['severity'], closable?: ToastState['closable']) => void;
};

export const ToastContext = createContext<ToastContextType>({  
  toast: { isOpen: false, message: '', severity: 'info' },  
  closeToast: () => {},  
  showToast: () => {},  
});
