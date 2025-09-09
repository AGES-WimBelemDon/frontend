import { useMediaQuery, useTheme } from '@mui/material';

export type DeviceSize = 'mobile' | 'tablet' | 'desktop';

export function useScreenSize() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    
  function deviceSizeString(): DeviceSize {
    if (isMobile) {
      return 'mobile';
    }
    if (isDesktop) {
      return 'desktop';
    }
    return 'tablet';
  }

  return {
    isMobile,
    isDesktop,
    deviceSize: deviceSizeString()
  };
}
