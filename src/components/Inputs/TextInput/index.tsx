import { Box, TextField, Typography } from '@mui/material';

import { useTextInput } from './hook';
import type { TextInputProps } from '../interface';

export function TextInput({
  label,
  placeholder,
  id,
}: TextInputProps) {
  const { setTextInput, searchParams } = useTextInput(id);

  const text = searchParams.get(`text${id}`);

  return (
    <Box>
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <TextField
        id="textfield"
        type="text"
        variant="standard"
        placeholder={placeholder}
        fullWidth
        sx={{
          width: '300px',
          marginTop: '1px',
        }}
        value={text}
        onChange={(text) => setTextInput(String(text.target.value))}
      />
    </Box>
  );
}
