import { useStudents } from "../../hooks/useStudents";

export function useResponsibleRegistrationPage() {
  const {
    responsibles,
    isLoadingResponsibles,
    responsiblesError,
    currentStudentId,
  } = useStudents();

  return {
    responsibles,
    isLoadingResponsibles,
    responsiblesError,
    studentId: currentStudentId,
  };
}
