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
  const [isEditing, setIsEditing] = useState(false);

  const debounceRef = useRef<number | null>(null);

  const commitNow = (value: string) => {
    setText(value, id);
  };

  const commitDebounced = (value: string) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      commitNow(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(searchParams.get(`text${id}`) ?? "");
    }
  }, [searchParams, id, isEditing]);

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
        value={localValue}
        onFocus={() => setIsEditing(true)}
        onChange={(e) => {
          const v = e.target.value;
          setLocalValue(v);
          commitDebounced(v);
        }}
        onBlur={() => {
          setIsEditing(false);
          if (debounceRef.current) window.clearTimeout(debounceRef.current);
          commitNow(localValue);
        }}
      />
    </Box>
  );
}