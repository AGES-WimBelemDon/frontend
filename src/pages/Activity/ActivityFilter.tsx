import { Box, TextField, Typography } from "@mui/material";

import { strings } from "../../constants";
import type { ActivityFilterProps } from "./interface";

export function ActivityFilter({ name, onNameChange }: ActivityFilterProps) {

  return (
    <Box
      gap={0.5}
      display="flex"
      flexDirection="column"
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
  );
}
