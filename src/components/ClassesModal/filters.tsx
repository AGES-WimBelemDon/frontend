import {
  Box,
  TextField,
  Typography,
} from "@mui/material";

import type { FilterProps } from "./interface";

export function Filters({
  label,
  name,
  placeholder,
  onChange
}: FilterProps) {

  return (
    <Box
      gap={0.5}
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Typography>{label}</Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        fullWidth
        value={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
