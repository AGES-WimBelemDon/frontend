import { useEffect } from "react";

import { useParams } from "react-router";

import { useStudents } from "../../hooks/useStudents";

export function useResponsibleRegistrationPage() {
  const { id } = useParams<{ id: string }>();
  const {
    selectStudent,
    responsibles,
    isLoadingResponsibles,
    responsiblesError,
    currentStudentId,
  } = useStudents();

  useEffect(() => {
    if (id && id !== currentStudentId) {
      selectStudent(id);
    }
  }, [id, currentStudentId, selectStudent]);

  return {
    responsibles,
    isLoadingResponsibles,
    responsiblesError,
    studentId: id,
  };
}
