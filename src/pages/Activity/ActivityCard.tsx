import { Edit } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

import type { ActivityCardProps } from "./interface";

export function ActivityCard({ content }: ActivityCardProps) {
  return (
    <Box
      key={content.id}
      border={"1px solid"}
      borderColor={"grey.200"}
      padding={3}
      borderRadius={3}
    >
      <Box mb={1} display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={"bold"} variant="subtitle1">
          {content.name}
        </Typography>
        <Button variant="contained" sx={{ aspectRatio: "4/4", padding: 0.5 }}>
          <Edit sx={{ width: 0.75 }} />
        </Button>
      </Box>

      <Box display={"grid"} gridTemplateColumns={"1fr 2fr"} gap={.5}>
        <Typography variant="subtitle2" fontWeight={"bold"}>
          Área:
        </Typography>
        <Typography variant="subtitle2" fontWeight={"bold"} color="grey.600">
          {content.area}
        </Typography>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"1fr 2fr"} gap={.5}>
        <Typography variant="subtitle2" fontWeight={"bold"}>
          Frequência:
        </Typography>
        <Typography variant="subtitle2" fontWeight={"bold"} color="grey.600">
          {content.frequency}
        </Typography>
      </Box>
      <Box display={"grid"} gridTemplateColumns={"1fr 2fr"} gap={.5}>
        <Typography variant="subtitle2" fontWeight={"bold"}>
          Professor:
        </Typography>
        <Typography variant="subtitle2" fontWeight={"bold"} color="grey.600">
          {content.teacher}
        </Typography>
      </Box>
    </Box>
  );
}
