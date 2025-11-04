import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";

import { useStudentResponsible } from "./hook";
import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";

export default function ResponsibleRegistration() {
  const { openModal } = useNewResponsibleModal();
  const {
    isLoadingResponsibles,
    responsiblesError,
    responsibles,
    studentId,
  } = useStudentResponsible();
  const isMobile = useScreenSize().isMobile;

  if (isLoadingResponsibles) {
    return (
      <>
        <CircularProgress />
        <Typography>{strings.studentsResponsibles.loadingResponsibles}</Typography>
      </>
    );
  }

  if (responsiblesError || !responsibles) {
    return <Typography color="error">{strings.studentsResponsibles.responsiblesError}</Typography>;
  }

  return (
    <>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} paddingBottom={2} justifyContent="space-between" alignItems="center">
        <PageTitle title={strings.studentsResponsibles.title} dataCy="responsible-registration" />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openModal}
        >
          {strings.studentsResponsibles.registerResponsible}
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {
            responsibles.length === 0 ? (
              <Typography>{strings.studentsResponsibles.noResponsibles}</Typography>
            ) : responsibles.map((responsible) => (
              <PersonCard
                key={responsible.id}
                fullName={responsible.fullName}
                socialName={responsible.socialName || ""}
                registrationNumber={responsible.registrationNumber}
                dateOfBirth={responsible.dateOfBirth}
                nis={responsible.nis || ""}
                phoneNumber={responsible.phoneNumber}
                email={responsible.email || ""}
                address={responsible.address}
                relationship={responsible.relationship || ""}
                race={responsible.race || ""}
                gender={responsible.gender || ""}
                educationLevel={responsible.educationLevel || ""}
                socialPrograms={responsible.socialPrograms || ""}
                employmentStatus={responsible.employmentStatus || ""}
              />
            ))}
        </Stack>
      </Box>
      <NewResponsibleModal studentId={studentId} />
    </>
  );
}