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
import type { ResponsibleData } from "./interface/interface";
import { pt } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { DateInput } from "../Inputs/DateInput";
import { useDateInput } from "../Inputs/DateInput/hook";
import { SelectInput } from "../Inputs/SelectInput";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { TextInput } from "../Inputs/TextInput";
import { useTextInput } from "../Inputs/TextInput/hook";

export function NewResponsibleModal() {
  const { showToast } = useToast();
  const { getText } = useTextInput();
  const { getSelect } = useSelectInput();
  const { getDate } = useDateInput();
  const { isOpen, closeModal } = useNewResponsibleModal();

  const setAllValues = (): ResponsibleData | undefined => {
    const name = getText("1");
    const cpf = getText("2");
    const birthDate = getDate("1");
    const civilState = getSelect("1");
    const nis = getText("3");
    const address = getText("4");
    const phone = getText("5");
    const email = getText("6");

    if (
      name != "" &&
      cpf != "" &&
      birthDate != "" &&
      civilState != "" &&
      nis != "" &&
      address != "" &&
      phone != "" &&
      email != ""
    ) {
      return {
        name,
        cpf,
        birthDate,
        civilState,
        nis,
        address,
        email,
        phone,
      };
    }
  };
  const addResponsible = () => {
    const responsible = setAllValues();
    if (responsible) {
      console.log(responsible);
      showToast("Responsável adicionado com sucesso!", "success");
      return closeModal();
    }
    showToast("Preencha todos os campos", "error");
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => closeModal()}
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
        Cadastrar Responsável
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
              id="1"
            />
            <DateInput id="1" label={pt.newResponsibleModal.inputs.birthDate}/>
            <TextInput
              label={pt.newResponsibleModal.inputs.nis}
              placeholder={pt.newResponsibleModal.placeholder.nis}
              id="3"
            />
            <TextInput
              label={pt.newResponsibleModal.inputs.phone}
              placeholder={pt.newResponsibleModal.placeholder.phone}
              id="5"
            />
          </Box>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextInput
              label={pt.newResponsibleModal.inputs.cpf}
              placeholder={pt.newResponsibleModal.placeholder.cpf}
              id="2"
            />
            <SelectInput
              label={pt.newResponsibleModal.inputs.civilState}
              options={[
                "Solteiro(a)",
                "Casado(a)",
                "Divorciado(a)",
                "Viuvo(a)",
              ]}
              id="1"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.address}
              placeholder={pt.newResponsibleModal.placeholder.address}
              id="4"
            />

            <TextInput
              label={pt.newResponsibleModal.inputs.email}
              placeholder={pt.newResponsibleModal.placeholder.email}
              id="6"
            />
          </Box>
        </Box>
      </DialogContent>

      {/* 3. Ações */}
      <DialogActions>
        <Button variant="contained" color="primary" onClick={addResponsible}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
