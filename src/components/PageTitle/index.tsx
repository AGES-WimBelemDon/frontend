import { Box, Typography, useMediaQuery } from '@mui/material';

import type { PageTitleProps } from './interface';

export function PageTitle({title}: PageTitleProps) {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box paddingY={2.5} paddingX={0.5}>
      <Typography variant='h1' fontWeight={'bold'} fontSize={isMobile ? 24 : 30}>
        {title}
      </Typography>
    </Box>
  );
}