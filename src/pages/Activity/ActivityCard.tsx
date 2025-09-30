import { Edit } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

import type { ActivityCardProps } from "./interface";
import { pt } from "../../constants";

export function ActivityCard({ content }: ActivityCardProps) {
  return (
    <Box
      key={content.id}
      border="1px solid"
      borderColor="grey.200"
      padding={3}
      borderRadius={3}
    >
      <Box mb={1} display="flex" justifyContent="space-between">
        <Typography fontWeight="bold" variant="subtitle1">
          {content.name}
        </Typography>
        <Button variant="contained" sx={{ aspectRatio: "4/4", padding: 0.5 }}>
          <Edit sx={{ width: 0.75 }} />
        </Button>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 2fr" gap={0.5}>
        <Typography variant="subtitle2" fontWeight="bold">
          {pt.activityList.card.area}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="grey.600">
          {content.area}
        </Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 2fr" gap={0.5}>
        <Typography variant="subtitle2" fontWeight="bold">
          {pt.activityList.card.frequency}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="grey.600">
          {content.frequency}
        </Typography>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 2fr" gap={0.5}>
        <Typography variant="subtitle2" fontWeight="bold">
          {pt.activityList.card.teacher}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="grey.600">
          {content.teacher}
        </Typography>
      </Box>
    </Box>
  );
}
