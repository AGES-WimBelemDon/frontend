/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useRoutes } from "./useRoutes";
import { api, endpoints } from "../services/api";
import { getStudentResponsibles as apiGetStudentResponsibles, getStudents } from "../services/students";
import { deactivateStudent as apiDeactivateStudent } from "../services/students";
import type { Id } from "../types/id";

export function useStudents() {
  const { getPathParamId } = useRoutes();
  const studentId = getPathParamId("alunos");
  const queryClient = useQueryClient();
  const [currentStudentId, setCurrentStudentId] = useState<Id | null>(studentId ?? null);

  const {
    isPending,
    error,
    data: studentsData,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  async function getStudentResponsiblesWithAddress(): Promise<any[]> {
    if (!currentStudentId) return [];

    const responsibles = await apiGetStudentResponsibles({
      id: currentStudentId,
    });

    const responsiblesWithAddress = await Promise.all(
      responsibles.map(async (r) => {
        try {
          const response = await api.get(
            endpoints.familyMembers.addressById(r.id) 
          );

          return { ...r, address: response.data };
        } catch (err) {
          console.error("Erro ao buscar endereço do responsável:", err);
          return { ...r, address: null };
        }
      })
    );

    return responsiblesWithAddress;
  }

  async function deactivate(id: number) {
    await apiDeactivateStudent(id);
    await queryClient.invalidateQueries({ queryKey: ["students"] });
  }

  const {
    isPending: isLoadingResponsibles,
    error: responsiblesError,
    data: responsibles,
  } = useQuery({
    queryKey: ["responsibles", currentStudentId],
    queryFn: getStudentResponsiblesWithAddress,
    enabled: currentStudentId !== null,
  });

  return {
    isLoadingStudents: isPending,
    studentsError: error,
    students: studentsData,

    isLoadingResponsibles,
    responsiblesError,
    responsibles,

    currentStudentId,
    selectStudent: setCurrentStudentId,
    deactivateStudent: deactivate,
  };
}
