import { useRoutes } from "../../hooks/useRoutes";
import { useStudents } from "../../hooks/useStudents";

export function useStudentsPage() {
  const {
    isLoadingStudents,
    studentsError,
    students,
    selectStudent,
  } = useStudents();
  const { goTo } = useRoutes();

  function handleCreateNewStudent() {
    goTo("/alunos", "/cadastro");
  };

  function handleCreateResponsible(studentId: string) {
    selectStudent(studentId);
    goTo("/alunos", `/${studentId}/responsaveis`);
  };

  function handleEditStudents(studentId: string) {
    selectStudent(studentId);
    goTo("/alunos", "/cadastro");
  };

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }
  
  return {
    isLoadingStudents,
    studentsError,
    students,
    handleCreateNewStudent,
    handleCreateResponsible,
    handleEditStudents,
    formatDate,
  };
}