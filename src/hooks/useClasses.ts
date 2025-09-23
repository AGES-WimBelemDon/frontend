import { useQuery } from "@tanstack/react-query";

import { getClasses } from "../services/classes";

export function useClasses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  function getClassTitleById(id: string) {
    const classItem = data?.find(classItem => classItem.id === id);
    return classItem ? classItem.title : "Turma Desconhecida";
  }

  return {
    isLoadingClasses: isPending,
    classesError: error,
    classes: data,
    getClassTitleById,
  };
}
