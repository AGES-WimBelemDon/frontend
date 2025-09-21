import { Box, TextField, Typography } from '@mui/material';

import { useDateInput } from './hook';
import { pt } from '../../../constants';

export function DateInput({ id }: { id: string }) {
  const { setDate, searchParams } = useDateInput(id);
  const value = searchParams.get(`date${id}`);
  return (
    <Box>
      <Typography fontSize={16} fontWeight="bold">
        {pt.dateInput.selectDate}
      </Typography>
      <TextField
        id="date"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={value ?? ''}
        onChange={(date) => setDate(date.target.value)}
      />
    </Box>
  );
}
