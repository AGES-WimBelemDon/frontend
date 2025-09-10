import { Box, TextField, Typography } from '@mui/material';

import { useDateInput } from './hook';
import { pt } from '../../constants';

export function DateInput() {
  const { setDate, searchParams } = useDateInput();
  const date = searchParams.get('date');

  return (
    <Box>
      <Typography fontSize={16} fontWeight='bold'>
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
        value={date}
        onChange={(date) => setDate(date.target.value)}
      />
    </Box>
  );
}
