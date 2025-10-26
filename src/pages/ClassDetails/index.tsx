import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { useClassDetailsPage } from "./hook";
import { strings } from "../../constants";

export default function ClassDetails() {
  const {
    goTo,
    classData,
    students,
    isLoadingClasses,
    classesError,
  } = useClassDetailsPage();

  const getFrequencyColor = (value: number) => {
    if (value < 50) return "error.main";
    if (value < 80) return "warning.main";
    return "success.main";
  };

  if (isLoadingClasses) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
        <Typography mt={2}>{strings.classDetails.loading}</Typography>
      </Box>
    );
  }

  if (classesError) {
    return (
      <Typography color="error" textAlign="center">
        {strings.classDetails.errorLoading}
      </Typography>
    );
  }

  if (!classData) {
    return (
      <Typography textAlign="center">
        {strings.classDetails.classNotFound}
      </Typography>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" gap={2}>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
      >
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          {classData.title}
        </Typography>

        <Button
          variant="outlined"
          sx={{
            borderWidth: 2,
            borderRadius: 2,
            borderColor: "primary.main",
            fontWeight: "bold",
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => goTo("/turmas", `/editar/${classData.id}`)}
        >
          {strings.classDetails.editClass}
        </Button>
      </Box>

      <Box>
        <Typography>
          <strong>{strings.classDetails.professor}:</strong>{" "}
          {classData.teacher || strings.classDetails.classNotFound}
        </Typography>
        <Typography>
          <strong>{strings.classDetails.level}:</strong>{" "}
          {classData.level || strings.classDetails.classNotFound}
        </Typography>
      </Box>

      <Box mt={2} display="flex" flexDirection="column" gap={1.5}>
        {students.length > 0 ? (
          students.map((student, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: "grey.300",
                backgroundColor: "background.default",
                boxShadow: "none",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontWeight="bold">{student.name}</Typography>
                <Typography color={getFrequencyColor(student.frequency)}>
                  <strong>{strings.classDetails.frequency}: {student.frequency}%</strong>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>{strings.classDetails.noStudents}</Typography>
        )}
      </Box>
    </Box>
  );
}
