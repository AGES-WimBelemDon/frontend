import { useState } from 'react';

import {
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';

import type { ButtonCardProps } from './interface';
import { pt } from '../../constants';

export function ButtonCard({ name, frequencyPercent }: ButtonCardProps) {
  const [status, setStatus] = useState<'present' | 'absent' | null>(null);

  return (
    <Card
      variant="outlined"
      sx={{
        gap: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2">
          {pt.buttonCard.frequency({ percent: frequencyPercent })}
        </Typography>
      </CardContent>
      <Box
        gap={2}
        display='flex'
        flexDirection='row-reverse'
      >
        <Button
          size='medium'
          color='primary'
          variant={status === 'present' ? 'contained' : 'outlined'}
          onClick={() => setStatus('present')}
        >
          <CheckIcon />
        </Button>
        <Button
          size='medium'
          color='error'
          variant={status === 'absent' ? 'contained' : 'outlined'}
          onClick={() => setStatus('absent')}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Card>
  );
};
