import type React from "react";

import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SxProps,
  type SelectChangeEvent,
} from "@mui/material";

import { CardList } from "../../components/CardList";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

interface ActivityFilterProps {
  name: string;
  area: string;
  frequency: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
  onAreaChange: React.Dispatch<React.SetStateAction<string>>;
  onFrequencyChange: React.Dispatch<React.SetStateAction<string>>;
}

export function ActivityFilter({
  name,
  area,
  frequency,
  onNameChange,
  onAreaChange,
  onFrequencyChange,
}: ActivityFilterProps) {
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
        <Typography>{strings.activityList.filters.name.title}</Typography>
        <TextField
          variant="outlined"
          placeholder={strings.activityList.filters.name.placeholder}
          fullWidth
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>{strings.activityList.filters.area.title}</Typography>
        <Select
          fullWidth
          value={area}
          onChange={(e: SelectChangeEvent) => onAreaChange(e.target.value)}
          displayEmpty
        >
          {/* TODO: Fetch options from API */}
          <MenuItem value="all">{strings.activityList.filters.area.placeholder}</MenuItem>
          <MenuItem value="esportes">{strings.activityList.filters.area.sports}</MenuItem>
          <MenuItem value="academia">{strings.activityList.filters.area.gym}</MenuItem>
          <MenuItem value="aquáticos">{strings.activityList.filters.area.water}</MenuItem>
        </Select>
      </Box>
      <Box sx={filterBoxStyle}>
        <Typography>{strings.activityList.filters.frequency.title}</Typography>
        <Select
          fullWidth
          value={frequency}
          onChange={(e: SelectChangeEvent) => onFrequencyChange(e.target.value)}
          displayEmpty
        >
          {/* TODO: Fetch options from API */}
          <MenuItem value="all">{strings.activityList.filters.frequency.placeholder}</MenuItem>
          <MenuItem value="diária">{strings.activityList.filters.frequency.daily}</MenuItem>
          <MenuItem value="semanal">{strings.activityList.filters.frequency.weekly}</MenuItem>
          <MenuItem value="mensal">{strings.activityList.filters.frequency.monthly}</MenuItem>
        </Select>
      </Box>
    </CardList>
  );
}
