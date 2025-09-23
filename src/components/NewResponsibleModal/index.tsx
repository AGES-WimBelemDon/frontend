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
import type { ResponsibleData } from "./interface";
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
  const { isOpen, closeModal } = useNewResponsibleModal();
  const { getSelect } = useSelectInput({ id: "new-responsible-civil-state" });
  const { getDate } = useDateInput({ id: "new-responsible-birth-date" });
  const { getTextParam: getName } = useTextInput({ id: "new-responsible-name" });
  const { getTextParam: getCpf } = useTextInput({ id: "new-responsible-cpf" });
  const { getTextParam: getNis } = useTextInput({ id: "new-responsible-nis" });
  const { getTextParam: getAddress } = useTextInput({ id: "new-responsible-address" });
  const { getTextParam: getPhone } = useTextInput({ id: "new-responsible-phone" });
  const { getTextParam: getEmail } = useTextInput({ id: "new-responsible-email" });

  function getFormData(): ResponsibleData | null {
    const name = getName();
    const cpf = getCpf();
    const birthDate = getDate();
    const civilState = getSelect();
    const nis = getNis();
    const address = getAddress();
    const phone = getPhone();
    const email = getEmail();

    if (name
      && cpf
      && birthDate
      && civilState
      && nis
      && address
      && phone
      && email) {
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

    return null;
  };
  
  const addResponsible = () => {
    const responsible = getFormData();
    if (responsible) {
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
      {/* 1. Título */}
      <DialogTitle
        fontWeight={"bold"}
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
              options={[
                "Solteiro(a)",
                "Casado(a)",
                "Divorciado(a)",
                "Viuvo(a)",
              ]}
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

      {/* 3. Ações */}
      <DialogActions>
        <Button variant="contained" color="primary" onClick={addResponsible}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
