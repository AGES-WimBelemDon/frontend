import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useRoutes } from "./useRoutes";
import { strings } from "../constants";
import { getClasses, getClassFrequency as apiGetClassFrequency } from "../services/classes";
import type { Id } from "../types/id";


export function useClasses() {
  const { getPathParamId } = useRoutes();
  const classId = getPathParamId("turmas");
  const [currentClassId, setCurrentClassId] = useState<Id | null>(classId ?? null);
  const { isPending, error, data } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  function getClassTitleById(id: Id) {
    if (!data) return strings.genericActions.loading;
    const classItem = data.find(c => c.id == id);
    return classItem ? classItem.name : "Turma Desconhecida";
  }

  async function getClassFrequency() {
    if (!currentClassId) {
      return Promise.resolve(undefined);
    }

    const date = new Date().toISOString().split("T")[0];

    return apiGetClassFrequency({ id: currentClassId, date });
  }

  const {
    isPending: isPendingFrequencyClass,
    error: errorFrequencyClass,
    data: dataFrequencyClass,
  } = useQuery({
    queryKey: ["class", currentClassId],
    queryFn: getClassFrequency,
    enabled: currentClassId !== null,
  })

  return {
    isLoadingClasses: isPending,
    classesError: error,
    classes: data,
    isLoadingFrequencyClass: isPendingFrequencyClass,
    frequencyClassError: errorFrequencyClass,
    frequencyClass: dataFrequencyClass,
    currentClassId,
    selectClass: setCurrentClassId,
    getClassTitleById,
  };
}
