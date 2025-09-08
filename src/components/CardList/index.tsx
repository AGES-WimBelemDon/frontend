import type { PropsWithChildren } from 'react';

import { Grid, useMediaQuery, useTheme } from '@mui/material';

export function CardList({ children }: PropsWithChildren) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const gridColumnsCountMapper = (() => {
    switch (true) {
    case isMobile:
      return 1;
    case isDesktop:
      return 3;
    default:
      return 2;
    }
  })();
  
  return (
    <Grid
      container
      display='grid'
      spacing={{ xs: 1 }}
      gridTemplateColumns={`repeat(${gridColumnsCountMapper}, 1fr)`}
    >
      {children}
    </Grid>
  );
}
