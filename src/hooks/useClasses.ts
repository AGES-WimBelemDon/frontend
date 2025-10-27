import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useRoutes } from "./useRoutes";
import { getClasses, getClassFrequency as apiGetClassFrequency } from "../services/classes";


export function useClasses() {
  const { getPathParamId } = useRoutes();
  const classId = getPathParamId("turmas");
  const [currentClassId, setCurrentClassId] = useState<number | null>(classId ? Number(classId) : null);
  const { isPending, error, data } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  function getClassTitleById() {
    const classItem = data?.find(classItem => classItem.id === currentClassId);
    return classItem ? classItem.title : "Turma Desconhecida";
  }

  async function getClassFrequency() {
    if (!currentClassId) {
      return Promise.resolve([]);
    }

    return apiGetClassFrequency({ id: currentClassId });
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
