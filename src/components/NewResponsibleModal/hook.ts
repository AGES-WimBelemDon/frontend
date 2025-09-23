import { useSearchParams } from "react-router";

import type { ResponsibleData } from "./interface";
import { pt } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useDateInput } from "../Inputs/DateInput/hook";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { useTextInput } from "../Inputs/TextInput/hook";

export function useNewResponsibleModal() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { showToast } = useToast();

  const { getSelect } = useSelectInput({ id: "new-responsible-civil-state" });
  const { getDate } = useDateInput({ id: "new-responsible-birth-date" });
  const { getTextParam: getName } = useTextInput({ id: "new-responsible-name" });
  const { getTextParam: getCpf } = useTextInput({ id: "new-responsible-cpf" });
  const { getTextParam: getNis } = useTextInput({ id: "new-responsible-nis" });
  const { getTextParam: getAddress } = useTextInput({ id: "new-responsible-address" });
  const { getTextParam: getPhone } = useTextInput({ id: "new-responsible-phone" });
  const { getTextParam: getEmail } = useTextInput({ id: "new-responsible-email" });

  const isOpen = searchParams.get("action") === "open-new-responsible-modal";

  function openModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-new-responsible-modal");
    setSearchParams(params);
  }

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  }

  function addResponsible() {
    const name = getName();
    const cpf = getCpf();
    const birthDate = getDate();
    const civilState = getSelect();
    const nis = getNis();
    const address = getAddress();
    const phone = getPhone();
    const email = getEmail();

    const formData: ResponsibleData = {
      name,
      cpf,
      birthDate,
      civilState,
      nis,
      address,
      phone,
      email,
    };

    if (Object.values(formData).some((value) => !value)) {
      showToast(pt.newResponsibleModal.errorText, "error");
      return;
    }

    showToast(pt.newResponsibleModal.successText, "success");
    closeModal();
  }

  return {
    isOpen,
    openModal,
    closeModal,
    addResponsible,
  };
}