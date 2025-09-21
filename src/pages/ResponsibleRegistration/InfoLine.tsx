import { Typography } from '@mui/material';

import type { InfoLineProps } from './interface';

export function InfoLine({
  label,
  value,
}: InfoLineProps) {
  return (
    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
      <Typography component="span" sx={{ fontWeight: 700, color: '#19806a' }}>
        {label}:{' '}
      </Typography>
      <Typography component="span" sx={{ color: 'text.primary' }}>
        {value}
      </Typography>
    </Typography>
  );
}
