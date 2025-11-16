import AddIcon from "@mui/icons-material/Add";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { useStudentResponsible } from "./hook";
import { NewResponsibleModal } from "../../components/NewResponsibleModal";
import { useNewResponsibleModal } from "../../components/NewResponsibleModal/hook";
import { EditResponsibleModal } from "../../components/EditResponsibleModal";
import { PageTitle } from "../../components/PageTitle";
import { PersonCard } from "../../components/PersonCard";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useQueryClient } from "@tanstack/react-query";

export default function ResponsibleRegistration() {
  const { openModal } = useNewResponsibleModal();
  const {
    isLoadingResponsibles,
    responsiblesError,
    responsibles,
    studentId,
  } = useStudentResponsible();
  const isMobile = useScreenSize().isMobile;
  const queryClient = useQueryClient();
  
  const [editingResponsibleId, setEditingResponsibleId] = useState<string | null>(null);

  const handleEditClick = (responsibleId: string) => {
    setEditingResponsibleId(responsibleId);
  };

  const handleCloseEditModal = () => {
    setEditingResponsibleId(null);
  };

  const handleEditSuccess = () => {
    if (studentId) {
      queryClient.invalidateQueries({ 
        queryKey: ["responsibles", studentId] 
      });
    }
    setEditingResponsibleId(null);
  };

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
                id={responsible.id}
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
                onEditClick={handleEditClick}
              />
            ))}
        </Stack>
      </Box>
      <NewResponsibleModal studentId={studentId} />
      {editingResponsibleId && (
        <EditResponsibleModal
          isOpen={!!editingResponsibleId}
          responsibleId={editingResponsibleId}
          studentId={studentId}
          onClose={handleCloseEditModal}
          onSuccess={handleEditSuccess}
        />
      )}
    </>
  );
}