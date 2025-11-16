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

import { useEditResponsibleModal } from "./hook";
import type { EditResponsibleModalProps } from "./interface";
import { strings } from "../../constants";

export function EditResponsibleModal({
  isOpen,
  responsibleId,
  studentId,
  onClose,
  onSuccess,
}: EditResponsibleModalProps) {
  const {
    formData,
    address,
    updateField,
    setAddress,
    updateResponsible,
    isSubmitting,
    raceOptions = [],
    genderOptions = [],
    educationLevelOptions = [],
    socialProgramsOptions = [],
    employmentStatusOptions = [],
  } = useEditResponsibleModal({ responsibleId, studentId, onClose, onSuccess });

  return (
    <Dialog open={!!isOpen} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle
        fontWeight="bold"
        fontSize={24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {strings.editResponsibleModal.title}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" fontWeight="bold">
          {strings.editResponsibleModal.personalInformation}
        </Typography>

        <Box
          gap={2}
          display="grid"
          gridTemplateColumns="1fr 1fr"
          border="2px solid"
          borderColor="primary.main"
          borderRadius={2}
          padding={2}
        >
          <TextField
            label={strings.editResponsibleModal.inputs.name}
            value={formData.fullName || ""}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.socialName}
            value={formData.socialName || ""}
            onChange={(e) => updateField("socialName", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.registrationNumber}
            value={formData.registrationNumber || ""}
            onChange={(e) => updateField("registrationNumber", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.birthDate}
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.nis}
            value={formData.nis || ""}
            onChange={(e) => updateField("nis", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.phone}
            value={formData.phoneNumber || ""}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.email}
            value={formData.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.relationship}
            value={formData.relationship || ""}
            onChange={(e) => updateField("relationship", e.target.value)}
          />
          <TextField
            label={strings.editResponsibleModal.inputs.race}
            select
            value={formData.race || ""}
            onChange={(e) => updateField("race", e.target.value)}
          >
            {raceOptions.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={strings.editResponsibleModal.inputs.gender}
            select
            value={formData.gender || ""}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            {genderOptions.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={strings.editResponsibleModal.inputs.educationLevel}
            select
            value={formData.educationLevel || ""}
            onChange={(e) => updateField("educationLevel", e.target.value)}
          >
            {educationLevelOptions.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={strings.editResponsibleModal.inputs.socialPrograms}
            select
            value={formData.socialPrograms || ""}
            onChange={(e) => updateField("socialPrograms", e.target.value)}
          >
            {socialProgramsOptions.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={strings.editResponsibleModal.inputs.employmentStatus}
            select
            value={formData.employmentStatus || ""}
            onChange={(e) => updateField("employmentStatus", e.target.value)}
          >
            {employmentStatusOptions.map(({ id, label }) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Typography variant="h6" fontWeight="bold" mt={2}>
          {strings.editResponsibleModal.addressInformation}
        </Typography>
        <Box
          gap={2}
          display="flex"
          flexDirection="column"
          border="2px solid"
          borderColor="primary.main"
          borderRadius={2}
          padding={2}
        >
          <TextField
            label={strings.newResponsibleModal.inputs.cep}
            value={address?.cep || formData.cep || ""}
            onChange={(e) => setAddress({ ...address, cep: e.target.value })}
          />
          {address?.street && (
            <>
              <TextField
                label={strings.newResponsibleModal.inputs.street}
                value={formData.street || address.street}
                onChange={(e) => updateField("street", e.target.value)}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label={strings.newResponsibleModal.inputs.city}
                value={formData.city || address.city}
                onChange={(e) => updateField("city", e.target.value)}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label={strings.newResponsibleModal.inputs.number}
                value={formData.number || ""}
                onChange={(e) => updateField("number", e.target.value)}
              />
              <TextField
                label={strings.newResponsibleModal.inputs.neighborhood}
                value={formData.neighborhood || address.neighborhood}
                onChange={(e) => updateField("neighborhood", e.target.value)}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label={strings.newResponsibleModal.inputs.state}
                value={formData.state || address.state}
                onChange={(e) => updateField("state", e.target.value)}
                InputProps={{ readOnly: true }}
              />
              <TextField
                label={strings.newResponsibleModal.inputs.complement}
                value={formData.complement || ""}
                onChange={(e) => updateField("complement", e.target.value)}
              />
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" onClick={updateResponsible} disabled={isSubmitting}>
          {isSubmitting ? strings.genericActions.loading : strings.genericActions.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}