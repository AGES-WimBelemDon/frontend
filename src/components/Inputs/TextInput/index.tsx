import { Box, TextField, Typography } from "@mui/material";

import { useTextInput } from "./hook";
import type { TextInputProps } from "../interface";

export function TextInput({
  id,
  label,
  placeholder,
  type,
}: TextInputProps) {
  const { text, setText } = useTextInput({ id });

  return (
    <Box
      sx={{
        paddingTop: 2,
        width: "100%",
      }}
    >
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <TextField
        id={`textfield-${id}`}
        type={type ?? "text"}
        variant="standard"
        placeholder={placeholder}
        fullWidth
        slotProps={{
          input: {
            sx: {
              fontSize: 15,
              color: "grey.A200",
            },
          },
        }}
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          console.log(e.target.value)
          setText(e.target.value)
        }}
      />
    </Box>
  );
}
