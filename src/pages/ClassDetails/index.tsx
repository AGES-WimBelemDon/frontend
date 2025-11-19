import { useContext } from "react";

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";

import { PageTitle } from "../../components/PageTitle";
import { strings } from "../../constants";
import { ClassesModalContext } from "../../contexts/ClassesModal/ClassesModalContext";
import { useClasses } from "../../hooks/useClasses";
import { useEnrollment } from "../../hooks/useEnrollments";
import { useRoutes } from "../../hooks/useRoutes";

export default function ClassDetails() {
  const { openModal } = useContext(ClassesModalContext);

  const { classEnrollment, classEnrollmentError, isLoadingClassEnrollment } =
    useEnrollment();
  const { classes, frequencyClass, frequencyClassError, getClassTitleById } = useClasses();
  const { getPathParamId } = useRoutes();

  const classId = getPathParamId("turmas");

  const classData = classes?.find((c) => c.id == classId);

  const classTitle = classId ? getClassTitleById(classId) : "";

  function handleOpenModal() {
    if (classData && classId) {
      openModal({ ...classData, id: classId });
    }
  }

  function getFrequencyColor(value: number) {
    if (value < 50) {
      return "error.main";
    }
    if (value < 80) {
      return "warning.main";
    }
    return "success.main";
  }

  if (isLoadingClassEnrollment) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
        <Typography mt={2}>{strings.classDetails.loading}</Typography>
      </Box>
    );
  }

  if (classEnrollmentError || frequencyClassError) {
    return (
      <Typography color="error" textAlign="center">
        {strings.classDetails.errorLoading}
      </Typography>
    );
  }

  if (!frequencyClass || !classEnrollment) {
    return (
      <Typography textAlign="center">
        {strings.classDetails.classNotFound}
      </Typography>
    );
  }

  const teachers = classEnrollment?.[0]?.teachers ?? [];

  return (
    <Box p={4} display="flex" flexDirection="column" gap={2}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        gap={1}
      >
        <PageTitle title={classTitle} dataCy="class-details-title" />
        <Typography>
          <strong>{strings.classDetails.teachers}:</strong>{" "}
          {teachers.map((teacher) => teacher.fullName).join(" - ")}
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderWidth: 2,
            borderRadius: 2,
            borderColor: "primary.main",
            fontWeight: "bold",
            fontSize: { xs: 12, sm: 14 },
            width: { xs: "auto", sm: "auto" },
          }}
          onClick={handleOpenModal}
        >
          {strings.classDetails.editClass}
        </Button>
      </Box>
      <Divider />
      <Typography fontWeight={"bold"} fontSize={18}>
        {strings.students.title}
      </Typography>
      {classEnrollment.map((classData) => {
        // This finds the matching frequency data for each student.
        // Note: This assumes the student's full name is a unique identifier.
        // Using a unique ID (e.g., s.id === classData.student.id) would be more robust if available.
        const studentFrequency = frequencyClass.studentList.find(
          (s) => s.name === classData.student.fullName
        );

        return (
          <Card
            key={classData.student.id} // Assuming student.id is available for a stable key
            variant="outlined"
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "grey.300",
              backgroundColor: "background.default",
              boxShadow: "none",
              mb: 1.5,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                "&:last-child": { pb: 2 },
              }}
            >
              <Typography fontWeight="bold">
                {classData.student.fullName}
              </Typography>
              {studentFrequency ? (
                <Typography
                  color={getFrequencyColor(studentFrequency.frequency)}
                >
                  <strong>
                    {strings.classDetails.frequency}:{" "}
                    {studentFrequency.frequency}%
                  </strong>
                </Typography>
              ) : (
                <Typography>Frequency not available</Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
