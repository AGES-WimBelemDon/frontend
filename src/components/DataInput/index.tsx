import { TextField } from '@mui/material';

export function DataInput() {
  return (
    <TextField
      id="date"
      label="Data"
      type="date"
      InputLabelProps={{
        shrink: true, // mantém o label acima
      }}
    />
  );
}