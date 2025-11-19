import { useQuery } from "@tanstack/react-query";

import { getActivities } from "../services/activities";
import type { Id } from "../types/id";

export function useActivities() {
  const { isPending, error, data } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  function getActivityTitleById(id: Id): string {
    if (!data) return "Carregando...";
    const activity = data.find(a => a.id == id);
    return activity ? activity.name : "Atividade Desconhecida";
  }

  return {
    isLoadingActivities: isPending,
    activitiesError: error,
    activities: data,
    getActivityTitleById,
  };
}
