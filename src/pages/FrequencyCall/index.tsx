import { Box, Button, Divider, List, ListItem, Typography } from "@mui/material";

import { useFrequencyCall } from "./hook";
import { FrequencyCard } from "../../components/FrequencyCard";
import type { FrequencyCardStudent } from "../../components/FrequencyCard/interface";
import { DateInput } from "../../components/Inputs/DateInput";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export function FrequencyCall() {
  const {
    students,
    updatePresence,
    registerCall,
    classTitle,
  } = useFrequencyCall();

  const { isMobile } = useScreenSize();

  if (!students) {
    return <Typography color="error">{strings.frequencyCall.studentsError}</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        overflow: "hidden"
      }}
    >
      <PageTitle
        title={
          strings.frequencyCall.title({
            classTitle: classTitle
          })}
        dataCy="frequency-call"
      />

      <DateInput id="1" label={strings.dateInput.selectDate} />
      <Divider
        sx={{
          bgcolor: "primary.main",
          height: 2,
          width: "100%",
          marginY: 2,
        }}
      />

      <List sx={{
        width: "100%",
        maxHeight: "50vh",
        overflowY: "auto"
      }}>
        {students.map((item: FrequencyCardStudent) => (
          <ListItem key={item.id} sx={{ paddingX: 0 }}>
            <FrequencyCard
              id={item.id}
              name={item.name}
              frequencyPercent={item.frequencyPercent}
              isPresent={item.isPresent}
              onChangePresence={(present) => updatePresence(item.id, present)}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "end", width: "100%", py: 2 }}>
        <Button
          onClick={() => registerCall()}
          variant="contained"
          color="primary"
          fullWidth={isMobile}
        >
          {strings.frequencyCall.save}
        </Button>
      </Box>
    </Box>
  );
}
