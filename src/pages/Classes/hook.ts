import { useMemo, useState } from "react";

import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";
import type { Id } from "../../types/id";

export function useClassesPage() {
  const { activities } = useActivities();
  const { isLoadingClasses, classesError, classes, selectClass } = useClasses();
  const { weekDaysOptions, levelOptions } = useFilters();
  const { goTo } = useRoutes();
  const { isMobile } = useScreenSize();

  const [activityFilter, setActivityFilter] = useState<Id | null>(null);
  const [dayFilter, setDayFilter] = useState<Id | null>(null);
  const [levelFilter, setLevelFilter] = useState<Id | null>(null);

  const filteredClasses = useMemo(() => {
    if (isLoadingClasses || classesError || !classes) {
      return [];
    }
    return classes.filter((c) => {
      return (
        (!activityFilter || c.activityId === activityFilter)
        && (!dayFilter || c.schedules.map(schedule => schedule.dayOfWeek).includes(dayFilter.toString()))
        && (!levelFilter || c.levelId === levelFilter)
      );
    });
  }, [isLoadingClasses, classesError, classes, activityFilter, dayFilter, levelFilter]);

  function handleClassClick(id: Id) {
    selectClass(id);
    goTo("/turmas", `/${id}`);
  }

  return {
    isLoadingClasses,
    classesError,
    activities,
    activityFilter,
    setActivityFilter,
    dayFilter,
    setDayFilter,
    weekDaysOptions,
    levelFilter,
    setLevelFilter,
    levelOptions,
    goTo,
    isMobile,
    filteredClasses,
    handleClassClick,
  };
}
