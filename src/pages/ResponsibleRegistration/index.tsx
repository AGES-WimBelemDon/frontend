import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";

import { useStudentResponsible } from "./hook";
import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { strings } from "../../constants";

export default function ResponsibleRegistration() {
  const { openModal } = useNewResponsibleModal();
  const {
    isLoadingResponsibles,
    responsiblesError,
    responsibles,
  } = useStudentResponsible();

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
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

      {/* TODO: Fix this hardcoded magic number */}
      <Box sx={{ maxWidth: 720 }}>
        <Stack spacing={2}>
          {
            responsibles.length === 0 ? (
              <Typography>{strings.studentsResponsibles.noResponsibles}</Typography>
            ) : responsibles.map((responsible) => (
              <PersonCard
                key={responsible.id}
                name={responsible.name}
                cpf={responsible.cpf}
                birthDate={responsible.birthDate}
                civilState={responsible.civilState}
                nis={responsible.nis}
                phone={responsible.phone}
                email={responsible.email}
                address={responsible.address}
              />
            ))}
        </Stack>
      </Box>
      <NewResponsibleModal />
    </>
  );
}