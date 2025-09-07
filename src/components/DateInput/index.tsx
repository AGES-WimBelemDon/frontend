import { Box, TextField, Typography } from '@mui/material';

import { useDateInput } from './hook/useDateInput';

export function DateInput() {

  const {setDate, searchParams} = useDateInput();

  const date = searchParams.get('date');

  return (
    <Box pb={2}>
      <Typography fontSize={16} fontWeight={'bold'}>
        Data da aula
      </Typography>
      <TextField
        id="date"
        type="date"
        slotProps={{
          inputLabel: {
            shrink: true, // mantém o label acima
          },
        }}
        value={date}
        onChange={(date) => setDate(date.target.value)}
      />
    </Box>
  );
}
