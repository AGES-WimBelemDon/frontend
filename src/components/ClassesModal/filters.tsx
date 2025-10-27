import type React from "react";

import {
  Box,
  TextField,
  Typography,
  type SxProps,
} from "@mui/material";

import { CardList } from "../../components/CardList";

interface FilterProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export function Filters({
  label,
  name,
  placeholder,
  onChange
}: FilterProps) {

  const filterBoxStyle: SxProps = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 0.5,
  };

  return (
    <CardList>
      <Box
        sx={filterBoxStyle}
        gridColumn={"span 2"}
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

    </CardList>
  );
}
