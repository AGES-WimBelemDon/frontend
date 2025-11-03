import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useRoutes } from "./useRoutes";
import { useToast } from "./useToast";
import { getStudentResponsibles as apiGetStudentResponsibles, getStudents } from "../services/students";
import { deactivateStudent as apiDeactivateStudent } from "../services/students";

export function useStudents() {
  const { getPathParamId } = useRoutes();
  const studentId = getPathParamId("alunos");
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(studentId ? Number(studentId) : null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  async function getStudentResponsibles() {
    if (!currentStudentId) {
      return Promise.resolve([]);
    }

    return apiGetStudentResponsibles({ id: currentStudentId });
  }

  async function deactivate(id: number) {
    await apiDeactivateStudent(id);
    // Atualiza a lista sem recarregar a página
    await queryClient.invalidateQueries({ queryKey: ["students"] });
    showToast("Aluno desativado com sucesso.", "success");
  }

  const {
    isPending: isPendingResponsibles,
    error: errorResponsibles,
    data: dataResponsibles,
  } = useQuery({
    queryKey: ["responsibles", currentStudentId],
    queryFn: getStudentResponsibles,
    enabled: currentStudentId !== null,
  });

  return {
    isLoadingStudents: isPending,
    studentsError: error,
    students: data,
    isLoadingResponsibles: isPendingResponsibles,
    responsiblesError: errorResponsibles,
    responsibles: dataResponsibles,
    currentStudentId,
    selectStudent: setCurrentStudentId,
    deactivateStudent: deactivate,
  };
}
