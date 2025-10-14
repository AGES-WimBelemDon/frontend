import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { useNewResponsibleModal } from "./hook";
import { strings } from "../../constants";
import { DateInput } from "../Inputs/DateInput";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";

type NewResponsibleModalProps = {
  studentId?: string;
};

export function NewResponsibleModal({ studentId }: NewResponsibleModalProps) {
  const {
    isOpen,
    closeModal,
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions,
    addResponsible,
    isSubmitting,
  } = useNewResponsibleModal(studentId);

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      maxWidth="lg"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 2,
          padding: 2,
          backgroundColor: "grey.50",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        fontWeight="bold"
        fontSize={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        {strings.newResponsibleModal.title}
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 2, 
            top: "50%",
            transform: "translateY(-90%)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {strings.newResponsibleModal.personalInformation}
        </Typography>
        <Box
          gap={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          border="2px solid"
          borderColor="primary.main"
          borderRadius={2}
          width="100%"
          padding={2}
          mb={2}
        >
          <Box gap={2} flex={1} display="flex" flexDirection="column">
            <TextInput
              label={strings.newResponsibleModal.inputs.name}
              placeholder={strings.newResponsibleModal.inputs.namePlaceholder}
              id="responsible-fullName"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.socialName}
              placeholder={strings.newResponsibleModal.inputs.socialNamePlaceholder}
              id="responsible-socialName"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.registrationNumber}
              placeholder={strings.newResponsibleModal.inputs.registrationNumberPlaceholder}
              id="responsible-registrationNumber"
            />
            <DateInput id="responsible-dateOfBirth" label={strings.newResponsibleModal.inputs.birthDate} />
            <TextInput
              label={strings.newResponsibleModal.inputs.nis}
              placeholder={strings.newResponsibleModal.inputs.nisPlaceholder}
              id="responsible-nis"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.phone}
              placeholder={strings.newResponsibleModal.inputs.phonePlaceholder}
              id="responsible-phoneNumber"
            />
            <SelectInput
              label={strings.newResponsibleModal.inputs.employmentStatus}
              options={employmentStatusOptions}
              id="responsible-employmentStatus"
            />
          </Box>
          <Box flex={1} gap={2} display="flex" flexDirection="column">
            <TextInput
              label={strings.newResponsibleModal.inputs.email}
              placeholder={strings.newResponsibleModal.inputs.emailPlaceholder}
              id="responsible-email"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.relationship}
              placeholder={strings.newResponsibleModal.inputs.relationshipPlaceholder}
              id="responsible-relationship"
            />
            <SelectInput
              label={strings.newResponsibleModal.inputs.race}
              options={raceOptions}
              id="responsible-race"
            />
            <SelectInput
              label={strings.newResponsibleModal.inputs.gender}
              options={genderOptions}
              id="responsible-gender"
            />
            <SelectInput
              label={strings.newResponsibleModal.inputs.educationLevel}
              options={educationLevelOptions}
              id="responsible-educationLevel"
            />
            <SelectInput
              label={strings.newResponsibleModal.inputs.socialPrograms}
              options={socialProgramsOptions}
              id="responsible-socialPrograms"
            />
          </Box>
        </Box>

        <Typography variant="h6" fontWeight="bold" mb={1}>
          {strings.newResponsibleModal.addressInformation}
        </Typography>
        <Box
          gap={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          border="2px solid"
          borderColor="primary.main"
          borderRadius={2}
          width="100%"
          padding={2}
        >
          <Box gap={2} flex={1} display="flex" flexDirection="column">
            <TextInput
              label={strings.newResponsibleModal.inputs.street}
              placeholder={strings.newResponsibleModal.inputs.streetPlaceholder}
              id="responsible-street"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.city}
              placeholder={strings.newResponsibleModal.inputs.cityPlaceholder}
              id="responsible-city"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.cep}
              placeholder={strings.newResponsibleModal.inputs.cepPlaceholder}
              id="responsible-cep"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.number}
              placeholder={strings.newResponsibleModal.inputs.numberPlaceholder}
              id="responsible-number"
            />
          </Box>
          <Box flex={1} gap={2} display="flex" flexDirection="column">
            <TextInput
              label={strings.newResponsibleModal.inputs.neighborhood}
              placeholder={strings.newResponsibleModal.inputs.neighborhoodPlaceholder}
              id="responsible-neighborhood"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.state}
              placeholder={strings.newResponsibleModal.inputs.statePlaceholder}
              id="responsible-state"
            />
            <TextInput
              label={strings.newResponsibleModal.inputs.complement}
              placeholder={strings.newResponsibleModal.inputs.complementPlaceholder}
              id="responsible-complement"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button 
          variant="contained" 
          onClick={addResponsible}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : strings.newResponsibleModal.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
