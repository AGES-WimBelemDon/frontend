import { useEffect, useRef, useState } from "react";

import { Box, TextField, Typography } from "@mui/material";

import { useTextInput } from "./hook";

export function TextInput({
  label,
  placeholder,
  id,
}: {
  label: string;
  placeholder: string;
  id: string;
}) {
  const { setText, searchParams } = useTextInput();
  const [localValue, setLocalValue] = useState(
    searchParams.get(`text${id}`) ?? ""
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setText(localValue, id);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localValue, id, setText]);

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
        id="textfield"
        type="text"
        variant="standard"
        placeholder={placeholder}
        fullWidth
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
        }}
        value={localValue ?? ""}
        onChange={(text) => setLocalValue(text.target.value)}
      />
    </Box>
  );
}
