import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { useFrequencyCall } from "./hook";
import { FrequencyCard } from "../../components/FrequencyCard";
import type { FrequencyCardStudent } from "../../components/FrequencyCard/interface";
import { DateInput } from "../../components/Inputs/DateInput";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";

export function FrequencyCall() {
  const {
    students,
    updatePresence,
    registerCall,
    updateCall,
    updateNote,
    activityTitle,
    classTitle,
  } = useFrequencyCall();

  if (!students) {
    return <Typography color="error">{strings.frequencyCall.studentsError}</Typography>;
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "88vh",
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
            activity: activityTitle,
            classTitle: classTitle
          })}
        dataCy="frequency-call"
      />

      <DateInput id="1" label={strings.dateInput.selectDate}/>
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
        height: "100%",

        overflowY: "hidden"
      }}>
        {students.map((item: FrequencyCardStudent) => (
          <ListItem key={item.id} sx={{ paddingX: 0 }}>
            <FrequencyCard
              id={String(item.id)}
              name={item.name}
              frequencyPercent={item.frequencyPercent}
              isPresent={item.isPresent}
              onChangePresence={(present) => updatePresence(item.id, present)}
              onChangeNote={(value) => updateNote(item.id, value === null ? "" : value)}
              notes={item.notes}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "end", alignItems: "end", width: "100%", height: "15vh"}}>
        <List style={{ display: "flex", gap: 2   }}>
          <Button
            onClick={() => registerCall()}
            variant="outlined"
            disabled={students.length == 0 ? false : true}
              
          >
            {strings.frequencyCall.create}
          </Button>
          <Button
            onClick={() => updateCall()}
            variant="contained"
            color="primary"
          >
            {strings.frequencyCall.save}
          </Button>
        </List>
      </Box>
    </Box>
  );
}