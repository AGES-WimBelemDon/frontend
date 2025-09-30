import { useRoutes } from "../../hooks/useRoutes";
import { useStudents } from "../../hooks/useStudents";

export function useStudentsPage() {
  const { isLoadingStudents, studentsError, students } = useStudents();
  const { goTo } = useRoutes();

  function handleCreateNewStudent() {
    goTo("cadastro");
  };

  function handleCreateResponsible(studentId: string) {
    goTo(`${studentId}/responsaveis/cadastro`);
  };

  return {
    isLoadingStudents,
    studentsError,
    students,
    handleCreateNewStudent,
    handleCreateResponsible,
  };
}