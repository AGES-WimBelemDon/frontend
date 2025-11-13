import { Box, TextField, Typography } from "@mui/material";

import type { ActivityFilterProps } from "./interface";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function ActivityFilter({ name, onNameChange }: ActivityFilterProps) {
  const { isMobile } = useScreenSize()

  return (
    <Box
      gap={0.5}
      display="flex"
      flexDirection="column"
    >
      <Typography fontSize={isMobile ? 14 : 16}>
        {strings.activityList.filters.name.title}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={strings.activityList.filters.name.placeholder}
        fullWidth
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </Box>
  );
}
