import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

import { useNewResponsibleModal } from "./hook";
import { strings } from "../../constants";
import { useScreenSize } from "../../hooks/useScreenSize";
import { DateInput } from "../Inputs/DateInput";
import { SelectInput } from "../Inputs/SelectInput";

export function NewResponsibleModal() {
  const {
    isOpen,
    closeModal,
    civilStateOptions,
    addResponsible,
  } = useNewResponsibleModal();

  const { isMobile } = useScreenSize()

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
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
        fontSize={isMobile ? 18 : 24}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
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

      <DialogContent sx={{display: "flex", flexDirection: "column", gap: 3, padding: 1, overflow: "auto"}}>
        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.name}
          placeholder={strings.newResponsibleModal.inputs.namePlaceholder}
          id="1"
          sx={{ mt: 1 }}
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <DateInput id="1" label={strings.newResponsibleModal.inputs.birthDate} />

        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.nis}
          placeholder={strings.newResponsibleModal.inputs.nisPlaceholder}
          id="3"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.phone}
          placeholder={strings.newResponsibleModal.inputs.phonePlaceholder}
          id="5"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />
        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.cpf}
          placeholder={strings.newResponsibleModal.inputs.cpfPlaceholder}
          id="2"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <SelectInput
          label={strings.newResponsibleModal.inputs.civilState}
          options={civilStateOptions}
          id="1"
        />

        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.address}
          placeholder={strings.newResponsibleModal.inputs.addressPlaceholder}
          id="4"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />

        <TextField
          fullWidth
          label={strings.newResponsibleModal.inputs.email}
          placeholder={strings.newResponsibleModal.inputs.emailPlaceholder}
          id="6"
          slotProps={{
            inputLabel: { sx: { color: "primary.main" }, shrink: true },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={addResponsible} fullWidth={isMobile}>
          {strings.newResponsibleModal.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
