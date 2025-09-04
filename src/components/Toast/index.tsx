import { Alert, Snackbar, useMediaQuery } from '@mui/material';

import { toastTemplates } from './interface';
import { useToast } from '../../hooks/useToast';

export function Toast() {
  const { toast, closeToast } = useToast();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Snackbar
      autoHideDuration={5000}
      open={toast.isOpen}
      anchorOrigin={
        isMobile
          ? { horizontal: 'center', vertical: 'bottom' }
          : { horizontal: 'right', vertical: 'top' }
      }
      onClose={closeToast}
    >
      <Alert variant="filled" severity={toast.severity}>
        {toastTemplates[toast.severity]?.(toast.message)}
      </Alert>
    </Snackbar>
  );
}
