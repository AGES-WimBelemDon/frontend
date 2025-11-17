import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

import { CustomSelectButton } from "./CustomSelectButton";
import { FrequencyStatus, type FrequencyCardProps } from "./interface";
import { strings } from "../../constants";
import { noteOptions } from "./CustomSelectButton/interface";
import { useScreenSize } from "../../hooks/useScreenSize";

export function FrequencyCard({
  name,
  frequencyPercent,
  isPresent,
  notes,
  isGeneral,
  onChangeNote,
  onChangePresence,
}: FrequencyCardProps) {
  const { isDesktop } = useScreenSize();

  return (
    <Card
      variant="outlined"
      sx={{
        gap: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
        padding: 2,
        backgroundColor: "background.default",
        width: "100%",
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        {!isGeneral ? (
          <>
            <Typography variant="subtitle1" fontWeight="bold" fontSize={16}>
              {name}
            </Typography>
            <Typography variant="body2" fontSize={14} color="grey.900">
              {strings.frequencyCard.frequency({
                percent: frequencyPercent.toString(),
              })}
            </Typography>
          </>
        ) : (
          <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
            {name}
          </Typography>
        )}
      </CardContent>
      <Box gap={2} display="flex" flexDirection="row">
        {isGeneral ? null : (
          <CustomSelectButton
            note={notes}
            options={noteOptions}
            onChange={onChangeNote ?? (() => {})}
          />
        )}
        <Button
          size="medium"
          color="success"
          variant={
            isPresent == FrequencyStatus.PRESENTE ? "contained" : "outlined"
          }
          onClick={() => onChangePresence(FrequencyStatus.PRESENTE)}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          <CheckIcon sx={{ ml: isDesktop ? 0.5 : 0 }} />
        </Button>
        <Button
          size="medium"
          color="error"
          variant={
            isPresent == FrequencyStatus.AUSENTE ? "contained" : "outlined"
          }
          onClick={() => onChangePresence(FrequencyStatus.AUSENTE)}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          <CloseIcon sx={{ ml: isDesktop ? 0.5 : 0 }} />
        </Button>
      </Box>
    </Card>
  );
}
