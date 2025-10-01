import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";

import { useStudentResponsible } from "./hook";
import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { pt } from "../../constants";

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
        <Typography>{pt.studentsResponsibles.loadingResponsibles}</Typography>
      </>
    );
  }

  if (responsiblesError || !responsibles) {
    return <Typography color="error">{pt.studentsResponsibles.responsiblesError}</Typography>;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <PageTitle title={pt.studentsResponsibles.title} dataCy="responsible-registration" />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openModal}
        >
          {pt.studentsResponsibles.registerResponsible}
        </Button>
      </Box>

      {/* TODO: Fix this hardcoded magic number */}
      <Box sx={{ maxWidth: 720 }}>
        <Stack spacing={2}>
          {
            responsibles.length === 0 ? (
              <Typography>{pt.studentsResponsibles.noResponsibles}</Typography>
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