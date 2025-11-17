import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography, Button, IconButton } from "@mui/material";

import type { ActivityCardProps } from "./interface";


export function ActivityCard({ content, onEdit }: ActivityCardProps) {
  return (
    <Box
      gap={1.5}
      display="flex"
      flexDirection="column"
      padding={2}
      bgcolor="background.default"
      border="1px solid"
      borderRadius={2}
      borderColor="grey.300"
      boxShadow="0px 1px 4px rgba(0,0,0,0.1)"
      data-cy={`activity-card-${content.id}`}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="bold">
          {content.name}
        </Typography>

        {onEdit && (
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label={`editar-atividade-${content.id}`}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Button
        variant="outlined"
        fullWidth
        sx={{
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Ver turmas
      </Button>
    </Box>
  );
}

