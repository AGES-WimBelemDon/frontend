import { useQuery } from "@tanstack/react-query";

import { getClasses } from "../services/classes";

export function useClasses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });

  function getClassTitleById(id: string) {
    if (!data) return "Carregando...";
    const classItem = data.find(c => c.id === id.toString());
    return classItem ? classItem.name : "Turma Desconhecida";
  }

  return {
    isLoadingClasses: isPending,
    classesError: error,
    classes: data,
    getClassTitleById,
  };
}
