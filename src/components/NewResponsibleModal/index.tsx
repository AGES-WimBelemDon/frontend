import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { useNewResponsibleModal } from "./hook";
import { pt } from "../../constants";
import { useSelectOptions } from "../../hooks/useSelectOptions";
import { DateInput } from "../Inputs/DateInput";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";

export function NewResponsibleModal() {
  const { isOpen, closeModal, addResponsible } = useNewResponsibleModal();
  const { selectOptions, isLoadingSelectOptions, selectOptionsError } = useSelectOptions("civil-state");

  if (isLoadingSelectOptions) {
    return <div>{pt.newResponsibleModal.loading}</div>;
  }

  if (selectOptionsError || !selectOptions) {
    return <div>{pt.newResponsibleModal.optionsError}</div>;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        fontWeight="bold"
        fontSize={24}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        {pt.newResponsibleModal.title}
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
        <Box
          sx={{
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            padding: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextInput
              label={pt.newResponsibleModal.inputs.name}
              placeholder={pt.newResponsibleModal.placeholder.name}
              id="new-responsible-name"
            />
            <DateInput id="new-responsible-birth-date" />
            <TextInput
              label={pt.newResponsibleModal.inputs.nis}
              placeholder={pt.newResponsibleModal.placeholder.nis}
              id="new-responsible-nis"
            />
            <TextInput
              label={pt.newResponsibleModal.inputs.phone}
              placeholder={pt.newResponsibleModal.placeholder.phone}
              id="new-responsible-phone"
              type="tel"
            />
          </Box>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextInput
              label={pt.newResponsibleModal.inputs.cpf}
              placeholder={pt.newResponsibleModal.placeholder.cpf}
              id="new-responsible-cpf"
            />
            <SelectInput
              label={pt.newResponsibleModal.inputs.civilState}
              options={selectOptions}
              id="new-responsible-civil-state"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.address}
              placeholder={pt.newResponsibleModal.placeholder.address}
              id="new-responsible-address"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.email}
              placeholder={pt.newResponsibleModal.placeholder.email}
              id="new-responsible-email"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={addResponsible}>
          {pt.newResponsibleModal.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
