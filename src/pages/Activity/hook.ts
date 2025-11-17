import { useEffect, useState } from "react";

import { useScreenSize } from "../../hooks/useScreenSize";
import { getActivities, createActivity } from "../../services/activities";
import type { Activity } from "../../types/activities";

export function useActivityPage() {
  const { isMobile } = useScreenSize();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [activitiesError, setActivitiesError] = useState<Error | null>(null);

  const [name, setName] = useState("");

  async function loadActivities() {
    try {
      setIsLoadingActivities(true);
      const data = await getActivities();
      setActivities(data);
      setActivitiesError(null);
    } catch (error) {
      if (error instanceof Error) {
        setActivitiesError(error);
      } else {
        setActivitiesError(new Error("Erro desconhecido ao carregar atividades"));
      }
    } finally {
      setIsLoadingActivities(false);
    }
  }

  async function createActivityAndReload(activityData: Omit<Activity, "id">) {
    try {
      await createActivity(activityData);
      await loadActivities();
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setActivitiesError(error);
      } else {
        setActivitiesError(new Error("Erro desconhecido ao criar atividade"));
      }
      return false;
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  const filteredActivities = activities.filter((a) =>
    a.name.toLowerCase().includes(name.toLowerCase())
  );

  return {
    isLoadingActivities,
    activitiesError,
    isMobile,
    name,
    setName,
    activities,
    filteredActivities,
    loadActivities,
    createActivityAndReload
  };
}
