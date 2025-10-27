import {
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

import type { FrequencyCardProps } from "./interface";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function FrequencyCard({
  name,
  frequencyPercent,
  isPresent,
  onChangePresence,
}: FrequencyCardProps) {
  const { isDesktop } = useScreenSize();

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
        padding: { xs: 2, sm: 2 },
        backgroundColor: "background.default",
        width: "100%",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.06)",
        border: "1px solid",
        borderColor: "grey.300",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          borderColor: "grey.400",
        },
      }}
    >
      <CardContent 
        sx={{ 
          padding: 0, 
          "&:last-child": { paddingBottom: 0 },
          flex: 1,
          minWidth: 0,
          marginRight: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="600"
          fontSize={{ xs: 15, sm: 15 }}
          color="primary.main"
          sx={{ mb: 0.3, lineHeight: 1.4 }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          fontSize={{ xs: 13, sm: 13 }}
          color="grey.600"
          sx={{ lineHeight: 1.3 }}
        >
          {strings.frequencyCard.frequency({ percent: frequencyPercent.toString() })}
        </Typography>
      </CardContent>
      <Box 
        gap={{ xs: 1, sm: 1.2 }} 
        display="flex" 
        flexDirection="row"
        alignItems="center"
        flexShrink={0}
      >
        {!isPresent && (
          <Button
            data-cy="frequency-card-observation-button"
            aria-label={strings.frequencyCard.addObservation}
            sx={{
              backgroundColor: "grey.400",
              color: "white",
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: "600",
              fontSize: { xs: 12, sm: 13 },
              paddingX: { xs: 1.5, sm: 2 },
              paddingY: { xs: 0.8, sm: 1 },
              minWidth: "auto",
              height: { xs: "35px", sm: "35px" },
              "&:hover": {
                backgroundColor: "grey.500",
              },
              "&:focus-visible": {
                outline: "3px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
              "& .MuiButton-startIcon": {
                marginLeft: 0,
                marginRight: isDesktop ? 0.5 : 0,
              }
            }}
            size="small"
            startIcon={<AddIcon sx={{ fontSize: { xs: 18, sm: 18 } }} />}
          >
            {isDesktop ? strings.frequencyCard.absentDetails : ""}
          </Button>
        )}
        <Button
          size="small"
          data-cy="frequency-card-present-button"
          aria-label={strings.frequencyCard.markPresent}
          onClick={() => onChangePresence(true)}
          sx={{
            borderRadius: 1.5,
            fontWeight: "600",
            paddingX: { xs: 1.5, sm: 1.5 },
            paddingY: { xs: 0.8, sm: 1 },
            minWidth: { xs: "40px", sm: "40px" },
            height: { xs: "36px", sm: "36px" },
            backgroundColor: isPresent ? "success.main" : "transparent",
            color: isPresent ? "white" : "success.main",
            border: "2px solid",
            borderColor: "success.main",
            "&:hover": {
              backgroundColor: isPresent ? "success.dark" : "rgba(46, 125, 50, 0.08)",
            },
            "&:focus-visible": {
              outline: "3px solid",
              outlineColor: "success.dark",
              outlineOffset: "2px",
            },
          }}
        >
          <CheckIcon sx={{ fontSize: { xs: 20, sm: 20 } }} />
        </Button>
        <Button
          size="small"
          data-cy="frequency-card-absent-button"
          aria-label={strings.frequencyCard.markAbsent}
          onClick={() => onChangePresence(false)}
          sx={{
            borderRadius: 1.5,
            fontWeight: "600",
            paddingX: { xs: 1.5, sm: 1.5 },
            paddingY: { xs: 0.8, sm: 1 },
            minWidth: { xs: "40px", sm: "40px" },
            height: { xs: "36px", sm: "36px" },
            backgroundColor: !isPresent ? "error.main" : "transparent",
            color: !isPresent ? "white" : "error.main",
            border: "2px solid",
            borderColor: "error.main",
            "&:hover": {
              backgroundColor: !isPresent ? "error.dark" : "rgba(211, 47, 47, 0.08)",
            },
            "&:focus-visible": {
              outline: "3px solid",
              outlineColor: "error.dark",
              outlineOffset: "2px",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: { xs: 20, sm: 20 } }} />
        </Button>
      </Box>
    </Card>
  );
}
