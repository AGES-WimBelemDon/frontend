import type React from "react";

import { Box, TextField, Typography, type SxProps } from "@mui/material";

import { CardList } from "../../components/CardList";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

interface ActivityFilterProps {
  name: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ActivityFilter({ name, onNameChange }: ActivityFilterProps) {
  const { isDesktop, isMobile } = useScreenSize();

  const filterBoxStyle: SxProps = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 0.5,
    gridColumn: "1 / -1",
  };

  return (
    <CardList>
      <Box
        sx={filterBoxStyle}
        gridColumn={!isMobile && !isDesktop ? "span 2" : 1}
      >
        <Typography>{strings.activityList.filters.name.title}</Typography>
        <TextField
          variant="outlined"
          placeholder={strings.activityList.filters.name.placeholder}
          fullWidth
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Box>
    </CardList>
  );
}
