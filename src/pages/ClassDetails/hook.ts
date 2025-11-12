import { useMemo } from "react";

import { useParams } from "react-router";

import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";

export function useClassDetailsPage() {
  const { id } = useParams();
  const { classes, isLoadingClasses, classesError } = useClasses();
  const { activities } = useActivities();
  const { goTo } = useRoutes();

  const classData = useMemo(
    () => classes?.find((c) => c.id === id),
    [classes, id]
  );

  const activityName = useMemo(() => {
    if (!classData || !activities) return "";
    return activities.find((a) => a.id === classData.activityId)?.name || "";
  }, [classData, activities]);

  return {
    id,
    goTo,
    classData,
    activityName,
    isLoadingClasses,
    classesError,
  };
}
