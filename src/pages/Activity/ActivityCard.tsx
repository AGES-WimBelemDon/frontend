import { Edit } from "@mui/icons-material";
import { Box, Typography, Button, IconButton } from "@mui/material";

import type { ActivityCardProps } from "./interface";
import { strings } from "../../constants";

export function ActivityCard({ content }: ActivityCardProps) {
  return (
    <Box
      key={content.id}
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
        p: 2,
        backgroundColor: "background.default",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="bold">
          {content.name}
        </Typography>
        <IconButton size="small" color="primary">
          <Edit fontSize="small" />
        </IconButton>
      </Box>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        {strings.activityList.viewClasses}
      </Button>
    </Box>
  );
}
