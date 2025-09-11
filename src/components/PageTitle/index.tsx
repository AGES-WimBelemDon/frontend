import { Typography } from '@mui/material';

import type { PageTitleProps } from './interface';
import { useScreenSize } from '../../hooks/useScreenSize';

export function PageTitle({ title, dataCy }: PageTitleProps) {
  const { isMobile } = useScreenSize();

  return (
    <Typography
      variant='h1'
      fontWeight={'bold'}
      fontSize={isMobile ? 24 : 30}
      paddingY={2.5}
      data-cy={`${dataCy}-page-title`}
    >
      {title}
    </Typography>
  );
}