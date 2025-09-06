import { useContext } from 'react';

import { ToastContext } from '../contexts/Toast/ToastContext';

export function useToast() {
  return useContext(ToastContext);
}
