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
        gap: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
        padding: "1em",
        backgroundColor: "background.default",
        width: "100%",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize={16}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          fontSize={14}
          color="grey.900"
        >
          {strings.frequencyCard.frequency({ percent: frequencyPercent.toString() })}
        </Typography>
      </CardContent>
      <Box gap={1} display="flex" flexDirection="row">
        <Button
          sx={{
            backgroundColor: "grey.500",
            color: "white",
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            paddingInline: 1.5,
            gap: 1
          }}
        >
          {isDesktop ? strings.frequencyCard.absentDetails : ""}
          <AddIcon/>
        </Button>
        <Button
          size="small"
          color="success"
          sx={{
            aspectRatio: "1/1",
            marginLeft: 1.5
          }}
          variant={isPresent ? "contained" : "outlined"}
          onClick={() => onChangePresence(true)}
        >
          <CheckIcon />
        </Button>
        <Button
          size="small"
          color="error"
          variant={!isPresent ? "contained" : "outlined"}
          onClick={() => onChangePresence(false)}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Card>
  );
}
