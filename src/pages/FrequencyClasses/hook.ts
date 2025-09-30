import { useMemo } from "react";

import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";

export function useFrequencyClasses() {
  const { goTo, goBack, getPathParamId } = useRoutes();
  const { getActivityTitleById } = useActivities();
  const { classes, isLoadingClasses, classesError } = useClasses();

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? "" : getActivityTitleById(activityId);

  const activityClasses = useMemo(() => {
    if (isLoadingClasses || classesError || !classes || !activityId) {
      return [];
    }
    return classes.filter((c) => c.activityId === activityId);
  }, [isLoadingClasses, classesError, classes, activityId]);

  return {
    goTo,
    goBack,
    activityTitle,
    classes: activityClasses,
    isLoadingClasses,
    classesError,
  };
}
