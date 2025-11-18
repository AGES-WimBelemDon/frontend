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
import type { NewResponsibleModalProps } from "./interface";
import { strings } from "../../constants";

export function NewResponsibleModal({ studentId }: NewResponsibleModalProps) {
  const {
    isOpen,
    closeModal,
    isMobile,
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions,
    address,
    setAddress,
    addResponsible,
    isSubmitting,
    formData,
    isEditing,
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
        {isEditing ? strings.newResponsibleModal.editTitle : strings.newResponsibleModal.title}
        <IconButton
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-90%)",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component={"form"} 
        onSubmit={addResponsible}
        id="form"
        key={isEditing ? `edit-${formData.registrationNumber}` : "new"}
      >
        <DialogContent
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {strings.newResponsibleModal.personalInformation}
          </Typography>
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
            border="0px solid"
            borderColor="primary.main"
            borderRadius={2}
            width="100%"
            padding={0}          
          >
            <TextField
              label={strings.newResponsibleModal.inputs.name}
              placeholder={strings.newResponsibleModal.inputs.namePlaceholder}
              id="fullName"
              required
              name="fullName"
              defaultValue={formData.fullName || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.socialName}
              placeholder={strings.newResponsibleModal.inputs.socialNamePlaceholder}
              id="socialName"
              name="socialName"
              defaultValue={formData.socialName || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.registrationNumber}
              placeholder={strings.newResponsibleModal.inputs.registrationNumberPlaceholder}
              id="registrationNumber"
              required
              name="registrationNumber"
              defaultValue={formData.registrationNumber || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              id="dateOfBirth"
              label={strings.newResponsibleModal.inputs.birthDate}
              name="dateOfBirth"
              required
              type="date"
              defaultValue={formData.dateOfBirth || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
        
            <TextField
              label={strings.newResponsibleModal.inputs.nis}
              placeholder={strings.newResponsibleModal.inputs.nisPlaceholder}
              id="nis"
              name="nis"
              defaultValue={formData.nis || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.phone}
              placeholder={strings.newResponsibleModal.inputs.phonePlaceholder}
              id="phoneNumber"
              name="phoneNumber"
              required
              defaultValue={formData.phoneNumber || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.employmentStatus}
              select={!!employmentStatusOptions}
              id="employmentStatus"
              name="employmentStatus"
              defaultValue={formData.employmentStatus || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {employmentStatusOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label={strings.newResponsibleModal.inputs.email}
              placeholder={strings.newResponsibleModal.inputs.emailPlaceholder}
              id="email"
              name="email"
              defaultValue={formData.email || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.relationship}
              placeholder={strings.newResponsibleModal.inputs.relationshipPlaceholder}
              id="relationship"
              required
              name="relationship"
              defaultValue={formData.relationship || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            />
            <TextField
              label={strings.newResponsibleModal.inputs.race}
              select={!!raceOptions}
              id="race"
              name="race"
              defaultValue={formData.race || ""}
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
              id="gender"
              name="gender"
              defaultValue={formData.gender || ""}
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
              id="educationLevel"
              name="educationLevel"
              defaultValue={formData.educationLevel || ""}
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
              id="socialPrograms"
              name="socialPrograms"
              defaultValue={formData.socialPrograms || ""}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
              }}
            >
              {socialProgramsOptions?.map(({ id, label }) => (
                <MenuItem key={id} value={id}>{label}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {strings.newResponsibleModal.addressInformation}
          </Typography>
          <Box 
            gap={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            border="0px solid"
            borderColor="primary.main"
            borderRadius={2}
            width="100%"
            padding={0}
          >
            <TextField 
              name="cep"
              label={strings.newResponsibleModal.inputs.cep}
              placeholder={strings.newResponsibleModal.inputs.cepPlaceholder}
              fullWidth
              required
              margin="normal"
              type="number"
              value={address?.cep || ""}
              onChange={(e) => {
                const value = e.target.value.slice(0, 8);
                setAddress({ ...address, cep: value });
              }}
              slotProps={{
                inputLabel: { sx: { color: "primary.main" }, shrink: true },
                htmlInput: {
                  sx: {
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "&[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                  },
                  onWheel: (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()
                }
              }}
        
            />
            {address?.street && (
              <>
                <TextField
                  value={address.street}
                  label={strings.newResponsibleModal.inputs.street}
                  placeholder={strings.newResponsibleModal.inputs.streetPlaceholder}
                  id="street"
                  name="street"
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
                  id="city"
                  name="city"
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
                  value={address.neighborhood}
                  label={strings.newResponsibleModal.inputs.neighborhood}
                  placeholder={strings.newResponsibleModal.inputs.neighborhoodPlaceholder}
                  id="neighborhood"
                  name="neighborhood"
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
                  id="state"
                  name="state"
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
                  value={address?.number || ""}
                  label={strings.newResponsibleModal.inputs.number}
                  placeholder={strings.newResponsibleModal.inputs.numberPlaceholder}
                  id="number"
                  required
                  name="number"
                  onChange={(e) => setAddress({ ...address, number: e.target.value })}
                  slotProps={{
                    inputLabel: { sx: { color: "primary.main" }, shrink: true },
                  }}
                />
                <TextField
                  value={address?.complement || ""}
                  label={strings.newResponsibleModal.inputs.complement}
                  placeholder={strings.newResponsibleModal.inputs.complementPlaceholder}
                  id="complement"
                  name="complement"
                  onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  slotProps={{
                    inputLabel: { sx: { color: "primary.main" }, shrink: true },
                  }}
                />
              </>
            )}
          </Box>
        </DialogContent>
      </Box>

      <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
        <Button
          variant="contained"
          disabled={isSubmitting}
          type="submit"
          form="form"
        >
          {isSubmitting
            ? strings.genericActions.loading
            : isEditing 
              ? strings.newResponsibleModal.updateButton
              : strings.newResponsibleModal.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
