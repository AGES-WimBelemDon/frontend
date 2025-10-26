import { useMemo, useState } from "react";

import { Dayjs } from "dayjs";
import { useSearchParams } from "react-router";


import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import { useUsers } from "../../hooks/useUsers";
import type { Student } from "../../services/students";
import type { User } from "../../services/users";

export interface IClassesModalForm {
  level: string;
  recurring: boolean;
  weekDays: string[];
  time: Dayjs | null;
}

interface UseClassesModalReturn {
  isOpen: boolean;
  nameStudent: string;
  nameTeacher: string;
  selectedStudents: string[];
  selectedTeachers: string[];
  setNameStudent: React.Dispatch<React.SetStateAction<string>>;
  setNameTeacher: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
  createClass: (data: IClassesModalForm) => boolean;
  openClassesModal: () => void;
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTeachers: React.Dispatch<React.SetStateAction<string[]>>;
  filtredStudents: Student[];
  filtredUsers: User[];
}

export function useClassesModal(): UseClassesModalReturn {
  const { showToast } = useToast();
  const { students, isLoadingStudents, studentsError } = useStudents();
  const { users, isLoadingUsers, usersError } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameStudent, setNameStudent] = useState("");
  const [nameTeacher, setNameTeacher] = useState("");

  const isOpen = searchParams.get("action") === "open-classes-modal";
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  function openClassesModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-classes-modal");
    setSearchParams(params);
  }

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  }

  function createClass(data: IClassesModalForm): boolean {
    if (data && selectedTeachers.length > 0 && selectedStudents.length > 0) {
      showToast("Turma criada com sucesso!", "success");
      closeModal();
      return true;
    } else {
      showToast("Por favor, preencha todos os campos.", "error");
      return false;
    }
  }

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
    selectedStudents,
    selectedTeachers,
    setNameStudent,
    setNameTeacher,
    closeModal,
    createClass,
    openClassesModal,
    setSelectedStudents,
    setSelectedTeachers,
    filtredStudents,
    filtredUsers,
  }
}
