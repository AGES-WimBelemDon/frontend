import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";

export function useFrequencyClasses() {
  const { goTo, getPathParamId } = useRoutes();
  const { getActivityTitleById } = useActivities();
  const { classes, isLoadingClasses, classesError } = useClasses();

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? "" : getActivityTitleById(activityId);

  return {
    goTo,
    activityTitle,
    classes,
    isLoadingClasses,
    classesError,
  };
}
