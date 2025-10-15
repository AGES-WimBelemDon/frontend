import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useNewResponsibleModal } from "./hook";
import { strings } from "../../constants";


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
    address,
    setAddress,
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
            <TextField
              label={strings.newResponsibleModal.inputs.name}
              placeholder={strings.newResponsibleModal.inputs.namePlaceholder}
              id="responsible-fullName"
              name="responsible-fullName"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.socialName}
              placeholder={strings.newResponsibleModal.inputs.socialNamePlaceholder}
              id="responsible-socialName"
              name="responsible-socialName"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.registrationNumber}
              placeholder={strings.newResponsibleModal.inputs.registrationNumberPlaceholder}
              id="responsible-registrationNumber"
              name="responsible-registrationNumber"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField 
              id="responsible-dateOfBirth"
              label={strings.newResponsibleModal.inputs.birthDate} 
              name="responsible-dateOfBirth"
              type="date"
              
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            
            <TextField
              label={strings.newResponsibleModal.inputs.nis}
              placeholder={strings.newResponsibleModal.inputs.nisPlaceholder}
              id="responsible-nis"
              name="responsible-nis"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.phone}
              placeholder={strings.newResponsibleModal.inputs.phonePlaceholder}
              id="responsible-phoneNumber"
              name="responsible-phoneNumber"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.employmentStatus}
              select={!!employmentStatusOptions}
              id="responsible-employmentStatus"
              name="responsible-employmentStatus"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {employmentStatusOptions?.map(({ id, label }) => (

                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box flex={1} gap={2} display="flex" flexDirection="column">
            <TextField
              label={strings.newResponsibleModal.inputs.email}
              placeholder={strings.newResponsibleModal.inputs.emailPlaceholder}
              id="responsible-email"
              name="responsible-email"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.relationship}
              placeholder={strings.newResponsibleModal.inputs.relationshipPlaceholder}
              id="responsible-relationship"
              name="responsible-relationship"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.race}
              select={!!raceOptions}
              id="responsible-race"
              name="responsible-race"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {raceOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label={strings.newResponsibleModal.inputs.gender}
              select={!!genderOptions}
              id="responsible-gender"
              name="responsible-gender"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {genderOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label={strings.newResponsibleModal.inputs.educationLevel}
              select={!!educationLevelOptions}
              id="responsible-educationLevel"
              name="responsible-educationLevel"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {educationLevelOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label={strings.newResponsibleModal.inputs.socialPrograms}
              select={!!socialProgramsOptions}
              id="responsible-socialPrograms"
              name="responsible-socialPrograms"
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {socialProgramsOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight="bold" mb={1}>
          {strings.newResponsibleModal.addressInformation}
        </Typography>
        <Box
          gap={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          border="2px solid"
          borderColor="primary.main"
          borderRadius={2}
          width="100%"
          padding={2}
        >
          <TextField
            name="responsible-cep"
            label={strings.newResponsibleModal.inputs.cep}
            placeholder={strings.newResponsibleModal.inputs.cepPlaceholder}
            fullWidth
            margin="normal"
            type="number"
            value={address?.code}
            onChange={(e) => setAddress({ ...address, code: e.target.value })}
            slotProps={{
              inputLabel: { sx: { color: "primary.main" }, shrink: true },
            }}
            
          />
          {address?.street && (
            <>
              <TextField
                value={address.street}
                label={strings.newResponsibleModal.inputs.street}
                placeholder={strings.newResponsibleModal.inputs.streetPlaceholder}
                id="responsible-street"
                aria-readonly
                slotProps={{
                  htmlInput: {
                    readOnly: true,
                    sx: { cursor: "not-allowed" }
                  },
                  inputLabel: { sx: { color: "primary.main" }, shrink: true },
                }}
              />
              <TextField
                value={address.city}
                label={strings.newResponsibleModal.inputs.city}
                placeholder={strings.newResponsibleModal.inputs.cityPlaceholder}
                id="responsible-city"
                aria-readonly
                slotProps={{
                  htmlInput: {
                    readOnly: true,
                    sx: { cursor: "not-allowed" }
                  },
                  inputLabel: { sx: { color: "primary.main" }, shrink: true },
                }}
              />
              <TextField
                value={address.number}
                label={strings.newResponsibleModal.inputs.number}
                placeholder={strings.newResponsibleModal.inputs.numberPlaceholder}
                id="responsible-number"
                slotProps={{
                  inputLabel: { sx: { color: "primary.main" }, shrink: true },
                }}
              />         
              <TextField
                value={address.neighborhood}
                label={strings.newResponsibleModal.inputs.neighborhood}
                placeholder={strings.newResponsibleModal.inputs.neighborhoodPlaceholder}
                id="responsible-neighborhood"
                aria-readonly
                slotProps={{
                  htmlInput: {
                    readOnly: true,
                    sx: { cursor: "not-allowed" }
                  }, 
                  inputLabel: { sx: { color: "primary.main" }, shrink: true },
                }}
              />
              <TextField
                value={address.state}
                label={strings.newResponsibleModal.inputs.state}
                placeholder={strings.newResponsibleModal.inputs.statePlaceholder}
                id="responsible-state"
                aria-readonly
                slotProps={{
                  htmlInput: {
                    readOnly: true,
                    sx: { cursor: "not-allowed" }
                  },
                  inputLabel: { sx: { color: "primary.main" , "&.Mui-disabled": { color: "red" }}, shrink: true },
                }}
              />
              <TextField
                value={address.complement}
                label={strings.newResponsibleModal.inputs.complement}
                placeholder={strings.newResponsibleModal.inputs.complementPlaceholder}
                id="responsible-complement"
                slotProps={{
                  inputLabel: { sx: { color: "primary.main" }, shrink: true },
                }}
              />
            </>
          )}
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
