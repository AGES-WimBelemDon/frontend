import { Alert, Snackbar, Typography, type SnackbarOrigin } from '@mui/material';

import { pt } from '../../constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useToast } from '../../hooks/useToast';

const toastPositioning: Record<'mobile' | 'desktop', SnackbarOrigin> = {  
  mobile: { vertical: 'bottom', horizontal: 'center' },  
  desktop: { vertical: 'top', horizontal: 'right' },  
};

export function Toast() {
  const { isMobile } = useScreenSize();
  const { toast, closeToast } = useToast();

  const toastPosition = toastPositioning[isMobile ? 'mobile' : 'desktop'];

  return (
    <Snackbar
      autoHideDuration={5000}
      open={toast.isOpen}
      onClose={closeToast}
      anchorOrigin={toastPosition}
    >
      <Alert
        variant="filled"
        severity={toast.severity}
        onClose={(toast.closable ? closeToast : undefined)}
        sx={{ width: '100%' }}
      >
        <Typography>  
          {pt.toast[toast.severity]({ message: toast.message })}  
        </Typography>
      </Alert>
    </Snackbar>
  );
}
