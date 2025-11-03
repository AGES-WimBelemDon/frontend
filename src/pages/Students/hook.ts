import { useRoutes } from "../../hooks/useRoutes";
import { useStudents } from "../../hooks/useStudents";
import { useToast } from "../../hooks/useToast";

export function useStudentsPage() {
  const {
    isLoadingStudents,
    studentsError,
    students,
    selectStudent,
    deactivateStudent,
  } = useStudents();
  const { goTo } = useRoutes();
  const { showToast } = useToast();

  function handleCreateNewStudent() {
    goTo("/alunos", "/cadastro");
  };

  function handleCreateResponsible(studentId: number) {
    selectStudent(studentId);
    goTo("/alunos", `/${studentId}/responsaveis`);
  };

  function handleEditStudents(studentId: number) {
    selectStudent(studentId);
    goTo("/alunos", `/${studentId}/editar`);
  };

  async function handleDeactivateStudent(studentId: number) {
    const confirmed = window.confirm("Tem certeza que deseja desativar este educando?");
    if (!confirmed) return;

    try {
      await deactivateStudent(studentId);
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        showToast("Erro interno no servidor.", "error");
        return;
      }
      showToast(err?.message , "error");
    }
  }

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
    handleDeactivateStudent,
    formatDate,
  };
}
