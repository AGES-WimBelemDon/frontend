import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useFrequencyGeneralCall } from "./hook";
import { FrequencyCard } from "../../components/FrequencyCard";
import { DateInput } from "../../components/Inputs/DateInput";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import type { FrequencyCardStudent } from "../../types/frequency";

export function FrequencyGeneralCall() {
  const { students, updatePresence, registerCall, isLoading } =
    useFrequencyGeneralCall();

  return (
    <Box
      sx={{
        width: "100%",
        height: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        overflow: "hidden",
      }}
    >
      <PageTitle
        title={strings.frequencyGeneralCall.title}
        dataCy="frequency-general-call"
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

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : students.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          {strings.frequencyGeneralCall.studentsError}
        </Typography>
      ) : (
        <>
          <List
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
            }}
          >
            {students.map((student) => {
              const cardStudent: FrequencyCardStudent = {
                id: student.studentId.toString(),
                name: student.fullName,
                frequencyPercent: 0,
                isPresent: student.status,
                notes: null,
              };

              return (
                <ListItem key={student.studentId} sx={{ paddingX: 0 }}>
                  <FrequencyCard
                    {...cardStudent}
                    isGeneral={true}
                    onChangePresence={(present) =>
                      updatePresence(student.studentId, present)
                    }
                  />
                </ListItem>
              );
            })}
          </List>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              width: "100%",
              height: "15vh",
            }}
          >
            <Button
              onClick={registerCall}
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {strings.frequencyGeneralCall.save}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
