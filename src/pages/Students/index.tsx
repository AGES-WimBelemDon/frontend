import { Add as AddIcon, PersonAdd as PersonAddIcon, Mode as ModeIcon } from "@mui/icons-material";
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
    handleEditStudents,
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
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleCreateNewStudent}
          sx={{
            fontWeight: "bold",
            border: "2px solid",
            borderRadius: 2
          }}
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
            <Card key={student.id} variant="outlined" sx={{ borderRadius: 2, border: "1px solid"}}>
              <CardContent sx={{ backgroundColor: "background.default" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="h2" fontWeight="bold">
                    {student.name}
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<ModeIcon />}
                      onClick={() => handleEditStudents(student.id)}
                      sx={{
                        fontWeight: "bold",
                        border: "2px solid",
                        borderRadius: 2
                      }}
                    >
                      {strings.students.editStudent}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<PersonAddIcon />}
                      onClick={() => handleCreateResponsible(student.id)}
                      sx={{
                        fontWeight: "bold",
                        border: "2px solid",
                        borderRadius: 2
                      }}
                    >
                      {strings.students.createResponsible}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </>
  );
}