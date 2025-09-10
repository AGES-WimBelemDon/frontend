import { Box, Typography } from '@mui/material';

import type { PageTitleProps } from './interface';

export function PageTitle({title}: PageTitleProps) {
  return (
    <Box paddingY={2.5} paddingX={0.5}>
      <Typography variant='h1' fontWeight={'bold'} fontSize={24}>
        {title}
      </Typography>
    </Box>
  );
}