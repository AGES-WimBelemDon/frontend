import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useRoutes } from "./useRoutes";
import { getStudentResponsibles as apiGetStudentResponsibles, getStudents } from "../services/students";

export function useStudents() {
  const { getPathParamId } = useRoutes();
  const studentId = getPathParamId("alunos");
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(studentId ? Number(studentId) : null);

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
  };
}
