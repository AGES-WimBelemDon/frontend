import { useMemo, useState } from "react";

import { getSwitchUtilityClass } from "@mui/material";
import { useSearchParams } from "react-router";

import type { ClassesModalData } from "./interface";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { useTextInput } from "../Inputs/TextInput/hook";

export function useClassesModal() {
  const { showToast } = useToast();
  const { getText } = useTextInput();
  const { getSelect } = useSelectInput();
  const { students, isLoadingStudents, studentsError } = useStudents();
  const { users, isLoadingUsers, usersError } = useUsers()
  const [nameStudent, setNameStudent] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");
  const [role, setRole] = useState("");


  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("action") === "open-create-class-modal";
  function openClassesModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-create-class-modal");
    setSearchParams(params);
  }
  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  }


  function getClassesField(): ClassesModalData | undefined {
    const active = getSwitchUtilityClass("disabled");
    const activity = getText("1");
    const level = getSelect("1");
    const periodicity = getSelect("2");
    const date = getSelect("3");
    if (
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

  function createClass() {
    const newClass = getClassesField();
    if (newClass) {
      showToast("Turma criada com sucesso!", "success");
      return closeModal();
    }
    showToast("Por favor, preencha todos os campos.", "error");
  }

  // precisa desenvolver o filtro, e algo parecido com "ActivityFilter", dentro da pasta de
  // src\pages\Activity\hook.ts
  const filtredStudents = useMemo(() => {
    if (isLoadingStudents || studentsError || !students) {
      return []
    }
    return students.filter((student) => {
      const nameMatch =
        nameStudent === "" ||
        student.fullName.toLowerCase().includes(nameStudent.toLowerCase());
      return nameMatch;
    })
  }, [isLoadingStudents, studentsError, students, nameStudent])

  const filtredUsers = useMemo(() => {
    if (isLoadingUsers || usersError || !users) {
      return []
    }
    return users.filter((user) => {
      const nameMatch =
        nameTeacher === "" ||
        user.full_name.toLowerCase().includes(nameTeacher.toLowerCase());
      return nameMatch;
    })

  }, [isLoadingUsers, usersError, users, nameTeacher])


  return {
    isOpen,
    nameStudent,
    nameTeacher,
    role,
    setNameStudent,
    setNameTeacher,
    setRole,
    closeModal,
    createClass,
    openClassesModal,
    filtredStudents,
    filtredUsers
  }
}