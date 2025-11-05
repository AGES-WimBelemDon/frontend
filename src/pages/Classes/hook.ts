import { useMemo, useState } from "react";

import { useClassesModal } from "../../components/ClassesModal/hook";
import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";

export function useClassesPage() {
  const { activities } = useActivities();
  const { isLoadingClasses, classesError, classes, selectClass } = useClasses();
  const { weekDaysOptions, levelOptions } = useFilters();
  const { goTo } = useRoutes();
  const { isMobile } = useScreenSize();
  const { openClassesModal } = useClassesModal();

  const [activityFilter, setActivityFilter] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const filteredClasses = useMemo(() => {
    if (isLoadingClasses || classesError || !classes) {
      return [];
    }
    return classes.filter((c) => {
      return (
        (!activityFilter || c.activityId === activityFilter)
        && (!dayFilter || c.weekDay === dayFilter)
        && (!levelFilter || c.level === levelFilter)
      );
    });
  }, [isLoadingClasses, classesError, classes, activityFilter, dayFilter, levelFilter]);

  function handleClassClick(id: number) {
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
    openClassesModal,
  };
}
