import { Box, TextField, Typography } from '@mui/material';

import { useDateInput } from './hook';
import { pt } from '../../../constants';

export function DateInput({ id }: { id: string }) {
  const { setDate, searchParams} = useDateInput();
  const value = searchParams.get(`date${id}`);
  return (
    <Box sx={{
      paddingTop: 2,
      width: '100%'
    }}>
      <Typography fontSize={16} fontWeight="bold">
        {pt.dateInput.selectDate}
      </Typography>
      <TextField
        id="date"
        type="date"
        slotProps={{
          input: {
            sx: {
              fontSize: 15,
              color: 'black', 
              '&::placeholder': {
                color: 'grey.900', 
                opacity: 0.5,
              },
            },
          },
          inputLabel: {
            shrink: true
          }
        }}  
        sx={{
          marginTop: '1px',
        }}
        value={value ?? ''}
        onChange={(date) => setDate(date.target.value, id)}
      />
    </Box>
  );
}
