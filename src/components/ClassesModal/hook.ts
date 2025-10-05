import { getSwitchUtilityClass } from "@mui/material";
import { useSearchParams } from "react-router";

import type { ClassesModalData } from "./interface";
import { useToast } from "../../hooks/useToast";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { useTextInput } from "../Inputs/TextInput/hook";

export function useClassesModal() {
  const {showToast} = useToast();
  const {getText} = useTextInput();
  const {getSelect}  = useSelectInput();

  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("action") === "open-create-class-modal";
  function  openClassesModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-create-class-modal");
    setSearchParams(params);
  }
  function closeModal(){
    const params = new URLSearchParams();
    setSearchParams(params);
  }


  function getClassesField(): ClassesModalData | undefined {
    const active = getSwitchUtilityClass("disabled");
    const activity = getText("1");
    const level = getSelect("1");
    const periodicity = getSelect("2");
    const date = getSelect("3");
    if(
      activity !== "" &&
            level !== "" &&
            periodicity !== ""
    ) return {
      activity,
      level,
      periodicity,
      date,
      active
    }
  }

  function createClass(){
    const newClass = getClassesField();
    if(newClass){
      showToast("Turma criada com sucesso!", "success");
      return closeModal();
    }
    showToast("Por favor, preencha todos os campos.", "error");
  }

  return {
    isOpen,
    closeModal,
    createClass,
    openClassesModal
  }
}