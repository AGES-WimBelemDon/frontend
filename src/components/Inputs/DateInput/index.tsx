import { Box, TextField, Typography } from "@mui/material";

import { useDateInput } from "./hook";

export function DateInput({ id, label }: { id: string, label: string }) {
  const { setDate, searchParams} = useDateInput();
  const value = searchParams.get(`date${id}`);
  return (
    <Box sx={{
      paddingTop: 2,
      width: "100%"
    }}>
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <TextField
        id="date"
        type="date"
        slotProps={{
          input: {
            sx: {
              fontSize: 15,
              color: "black", 
              "&::placeholder": {
                color: "grey.900", 
                opacity: 0.5,
              },
            },
          },
          inputLabel: {
            shrink: true
          }
        }}  
        sx={{
          marginTop: "1px",
        }}
        value={value ?? ""}
        onChange={(date) => setDate(date.target.value, id)}
      />
    </Box>
  );
}
