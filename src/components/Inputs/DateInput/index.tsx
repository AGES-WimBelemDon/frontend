import { Box, TextField, Typography } from "@mui/material";

import { useDateInput } from "./hook";
import { useScreenSize } from "../../../hooks/useScreenSize";

export function DateInput({ id, label }: { id: string, label: string }) {
  const { setDate, searchParams} = useDateInput();
  const value = searchParams.get(`date${id}`);
  const { isMobile } = useScreenSize()
  return (
    <Box sx={{
      width: "100%"
    }}>
      <Typography fontSize={isMobile ? 14 : 16}>
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
        fullWidth={isMobile}
      />
    </Box>
  );
}
