import type { PropsWithChildren } from 'react';

import { Grid, useMediaQuery, useTheme } from '@mui/material';

export function CardList({ children }: PropsWithChildren) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Grid
      container
      display='grid'
      spacing={{ xs: 1 }}
      gridTemplateColumns={isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}
    >
      {children}
    </Grid>
  );
}
