import { useQuery } from "@tanstack/react-query";

import { getActivities } from "../services/activities";

export function useActivities() {
  const { isPending, error, data } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  function getActivityTitleById(id: string) {
    if (!data) return "Carregando...";
    const activity = data.find(a => a.id == Number(id));
    return activity ? activity.name : "Atividade Desconhecida";
  }

  return {
    isLoadingActivities: isPending,
    activitiesError: error,
    activities: data,
    getActivityTitleById,
  };
}
