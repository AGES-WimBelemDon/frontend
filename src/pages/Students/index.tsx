import { Add as AddIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";

import { useStudentsPage } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";

export default function Students() {
  const {
    isLoadingStudents,
    studentsError,
    students,
    handleCreateNewStudent,
    handleCreateResponsible,
  } = useStudentsPage();

  if (isLoadingStudents) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.students.loadingStudents}</Typography>
      </>
    );
  }

  if (studentsError) {
    return <Typography color="error">{strings.students.studentsError}</Typography>;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={strings.students.title} dataCy="students" />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNewStudent}
        >
          {strings.students.createNew}
        </Button>
      </Box>

      {!students || students.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {strings.students.noStudents}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {students.map((student) => (
            <Card key={student.id} variant="outlined">
              <CardContent sx={{ backgroundColor: "background.default" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="h2">
                    {student.fullName}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleCreateResponsible(student.id)}
                  >
                    {strings.students.createResponsible}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}