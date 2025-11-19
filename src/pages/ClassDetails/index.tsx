import { useContext, useEffect } from "react";

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
  const { classes, getClassTitleById, selectClass } = useClasses();
  const { getPathParamId, goTo } = useRoutes();

  const classId = getPathParamId("turmas");

  useEffect(() => {
    if (classId) {
      selectClass(classId);
    }
  }, [classId, selectClass]);

  const classData = classes?.find((c) => c.id == classId);

  const classTitle = classId ? getClassTitleById(classId) : "";

  function handleOpenModal() {
    if (classData && classId) {
      openModal({ ...classData, id: classId });
    }
  }

  if (isLoadingClassEnrollment) {
    return (
      <Box textAlign="center" mt={6}>
        <CircularProgress />
        <Typography mt={2}>{strings.classDetails.loading}</Typography>
      </Box>
    );
  }

  if (classEnrollmentError) {
    return (
      <Typography color="error" textAlign="center">
        {strings.classDetails.errorLoading}
      </Typography>
    );
  }

  if (!classEnrollment) {
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
          data-cy="class-details-edit-button"
        >
          {strings.classDetails.editClass}
        </Button>
      </Box>
      <Divider />
      <Typography fontWeight={"bold"} fontSize={18}>
        {strings.students.title}
      </Typography>
      {classEnrollment.map((classData) => {
        return (
          <Card
            key={classData.student.id}
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
              <Typography fontWeight="bold">{classData.student.fullName}</Typography>
              <Button
                variant="outlined"
                onClick={() => goTo("/alunos", `/${classData.student.id}/editar`)}
                data-cy={`class-student-edit-${classData.student.id}`}
              >
                {strings.students.viewStudent}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
