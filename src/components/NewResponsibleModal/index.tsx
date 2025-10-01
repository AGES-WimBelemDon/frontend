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
import { DateInput } from "../Inputs/DateInput";
import { SelectInput } from "../Inputs/SelectInput";
import { TextInput } from "../Inputs/TextInput";

export function NewResponsibleModal() {
  const {
    isOpen,
    closeModal,
    civilStateOptions,
    addResponsible,
  } = useNewResponsibleModal();

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
          <Box
            gap={2}
            flex={1}
            display="flex"
            flexDirection="column"
          >
            <TextInput
              label={pt.newResponsibleModal.inputs.name}
              placeholder={pt.newResponsibleModal.inputs.namePlaceholder}
              id="1"
            />

            <DateInput id="1" label={pt.newResponsibleModal.inputs.birthDate} />

            <TextInput
              label={pt.newResponsibleModal.inputs.nis}
              placeholder={pt.newResponsibleModal.inputs.nisPlaceholder}
              id="3"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.phone}
              placeholder={pt.newResponsibleModal.inputs.phonePlaceholder}
              id="5"
            />
          </Box>
          <Box
            flex={1}
            gap={2}
            display="flex"
            flexDirection="column"
          >
            <TextInput
              label={pt.newResponsibleModal.inputs.cpf}
              placeholder={pt.newResponsibleModal.inputs.cpfPlaceholder}
              id="2"
            />

            <SelectInput
              label={pt.newResponsibleModal.inputs.civilState}
              options={civilStateOptions}
              id="1"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.address}
              placeholder={pt.newResponsibleModal.inputs.addressPlaceholder}
              id="4"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.email}
              placeholder={pt.newResponsibleModal.inputs.emailPlaceholder}
              id="6"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={addResponsible}>
          {pt.newResponsibleModal.buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
