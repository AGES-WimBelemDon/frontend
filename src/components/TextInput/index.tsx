import { Box, TextField, Typography } from '@mui/material';

export function TextInput({label, placeholder} : {label: string, placeholder: string}) {
  return (
    <Box>
      <Typography fontSize={16} fontWeight='bold'>
        {label}
      </Typography>
      <TextField
        id="textfield"
        type="text"
        variant='standard'
        placeholder={placeholder}
        fullWidth
        sx={{ 
          width: '300px',
          marginTop: '1px',
        }}
      />
    </Box>
  );
}
