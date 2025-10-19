import type React from "react";

import {
  Box,
  TextField,
  Typography,
  type SxProps,
} from "@mui/material";

import { CardList } from "../../components/CardList";
import { useScreenSize } from "../../hooks/useScreenSize";

interface FilterProps {
  label: string;
  name: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export function Filters({
  label,
  name,
  onChange
}: FilterProps) {
  const { isDesktop, isMobile } = useScreenSize();

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
        gridColumn={!isMobile && !isDesktop ? "span 2" : 1}
      >
        <Typography>{label}</Typography>
        <TextField
          variant="outlined"
          placeholder={`Insira o nome do ${label.toLowerCase}`}
          fullWidth
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>

    </CardList>
  );
}
