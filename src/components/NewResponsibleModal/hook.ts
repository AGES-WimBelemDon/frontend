import { useSearchParams } from "react-router";

import type { ResponsibleData } from "./interface";
import { pt } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useToast } from "../../hooks/useToast";
import { useDateInput } from "../Inputs/DateInput/hook";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { useTextInput } from "../Inputs/TextInput/hook";

export function useNewResponsibleModal() {
  const { showToast } = useToast();
  const { getText } = useTextInput();
  const { getSelect } = useSelectInput();
  const { getDate } = useDateInput();
  const { civilStateOptions } = useFilters();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("action") === "open-new-responsible-modal";

  function openModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-new-responsible-modal");
    setSearchParams(params);
  };

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  };
  
  function getResponsibleFields(): ResponsibleData | undefined {
    const name = getText("1");
    const cpf = getText("2");
    const birthDate = getDate("1");
    const civilState = getSelect("1");
    const nis = getText("3");
    const address = getText("4");
    const phone = getText("5");
    const email = getText("6");

    if (
      name !== "" &&
      cpf !== "" &&
      birthDate !== "" &&
      civilState !== "" &&
      nis !== "" &&
      address !== "" &&
      phone !== "" &&
      email !== ""
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
  
  function addResponsible() {
    const responsible = getResponsibleFields();
    
    if (responsible) {
      showToast(pt.newResponsibleModal.successMessage, "success");
      return closeModal();
    }

    showToast(pt.newResponsibleModal.pleaseFillAllFields, "error");
  };

  return {
    isOpen,
    openModal,
    closeModal,
    civilStateOptions,
    addResponsible,
  };
}
