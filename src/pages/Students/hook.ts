import { useMemo, useState } from "react";

import { strings } from "../../constants";
import { useRoutes } from "../../hooks/useRoutes";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";
import type { Id } from "../../types/id";

export function useStudentsPage() {
  const {
    isLoadingStudents,
    studentsError,
    students,
    selectStudent,
    deactivateStudent,
  } = useStudents();
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const { goTo } = useRoutes();
  const { showToast } = useToast();

  function handleCreateNewStudent() {
    goTo("/alunos", "/cadastro");
  };

  function handleCreateResponsible(studentId: Id) {
    selectStudent(studentId);
    goTo("/alunos", `/${studentId}/responsaveis`);
  };

  function handleEditStudents(studentId: Id) {
    selectStudent(studentId);
    goTo("/alunos", `/${studentId}/editar`);
  };

  async function handleDeactivateStudent(studentId: number) {
    const confirmed = window.confirm(strings.studentRegistration.confirmationMessage);
    if (!confirmed) return;
    try {
      await deactivateStudent(studentId);
      showToast(strings.studentRegistration.deactivationSuccess, "success");
    } catch {
      showToast(strings.studentRegistration.errors.internalError, "error");
    }
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  const filteredStudents = useMemo(() => {
    if (isLoadingStudents || studentsError || !students) {
      return [];
    }
    return students.filter((student) => {
      const nameMatch =
          fullName === "" ||
          student.fullName.toLowerCase().includes(fullName.toLowerCase());

      const statusMatch =
          status === "" ||
          student.status === status;
  
      return nameMatch && statusMatch;
    });
  }, [isLoadingStudents, studentsError, students, fullName, status]);
  
  return {
    isLoadingStudents,
    studentsError,
    students,
    handleCreateNewStudent,
    handleCreateResponsible,
    handleEditStudents,
    handleDeactivateStudent,
    formatDate,
    fullName,
    setFullName,
    status,
    setStatus,
    filteredStudents,
  };
}
