import { Add as AddIcon, PersonAdd as PersonAddIcon, Mode as ModeIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";

import { useStudentsPage } from "./hook";
import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { StudentFilter } from "./studentsFilter";

export default function Students() {
  const {
    isLoadingStudents,
    studentsError,
    students,
    handleCreateNewStudent,
    handleCreateResponsible,
    handleEditStudents,
    formatDate,
    fullName,
    setFullName,
    status,
    setStatus,
    filteredStudents,
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
      <StudentFilter
        name={fullName}
        onNameChange={setFullName}
        status={status}
        onStatusChange={setStatus}
      />

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
          {filteredStudents.map((student) => (
            <Card key={student.id} variant="outlined" 
              sx={{ borderRadius: 2, 
                    border: "1px solid" , 
                    color: student.status === "ATIVO" ? "text.main" : "grey.700", 
                    background: "none"
                  }}>
                    
              <CardContent>
                <Box 
                  display="flex" 
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between" 
                  alignItems={{ xs: "flex-start", md: "center" }}
                  gap={2}
                >
                  <Box display="flex" flexDirection="column" >
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{ color: student.status === "ATIVO" ? "text.main" : "grey.700" }}>
                      {student.fullName}
                    </Typography>
                    <Typography variant="body1" component="h2" fontWeight="semi-bold" sx={{ color: student.status === "ATIVO" ? "text.main" : "grey.600" }}>
                      {strings.students.birthday({ date: formatDate(student.dateOfBirth) })}
                    </Typography>
                    <Typography variant="body1" component="h2" fontWeight="semi-bold" sx={{ color: student.status === "ATIVO" ? "text.main" : "grey.600" }}>
                      {student.registrationNumber ? strings.students.registrationNumber({ registrationNumber: student.registrationNumber }) : ""}
                    </Typography>
                    <Typography variant="body1" component="h2" fontWeight="semi-bold" sx={{ color: student.status === "ATIVO" ? "success.main" : "error.main" }}>
                      {student.status ? strings.students.status({ status: student.status }) : ""}
                    </Typography>
                  </Box>
                  <Box 
                    display="flex" 
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={1}
                    width={{ xs: "100%", md: "auto" }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<ModeIcon />}
                      onClick={() => handleEditStudents(student.id)}
                      sx={{
                        color: student.status === "ATIVO" ? "text.main" : "grey.600",
                        fontWeight: "bold",
                        border: "2px solid",
                        borderRadius: 2,
                        width: { xs: "100%", sm: "auto" }
                      }}
                    >
                      {strings.students.editStudent}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<PersonAddIcon />}
                      onClick={() => handleCreateResponsible(student.id)}
                      sx={{
                        color: student.status === "ATIVO" ? "text.main" : "grey.600",
                        fontWeight: "bold",
                        border: "2px solid",
                        borderRadius: 2,
                        width: { xs: "100%", sm: "auto" }
                      }}
                    >
                      {strings.students.viewResponsible}
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
