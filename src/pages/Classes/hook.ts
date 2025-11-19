import { useMemo, useState, useEffect } from "react";

import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useFilters } from "../../hooks/useFilters";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";
import type { Level } from "../../types/filters";
import type { Id } from "../../types/id";

export function useClassesPage() {
  const { activities } = useActivities();
  const { isLoadingClasses, classesError, classes, selectClass } = useClasses();
  const { weekDaysOptions, levelOptions } = useFilters();
  const { goTo } = useRoutes();
  const { isMobile } = useScreenSize();

  const [activityFilter, setActivityFilter] = useState<Id | null>(null);
  const [dayFilter, setDayFilter] = useState<Id | null>(null);
  const [levelFilter, setLevelFilter] = useState<Level | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const activityIdParam = params.get("activityId");
    if (activityIdParam) {
      setActivityFilter(activityIdParam as Id);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (activityFilter) {
      params.set("activityId", String(activityFilter));
    } else {
      params.delete("activityId");
    }
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  }, [activityFilter]);

  const filteredClasses = useMemo(() => {
    if (isLoadingClasses || classesError || !classes) {
      return [];
    }
    return classes.filter((c) => {
      return (
        (!activityFilter || c.activityId == activityFilter)
        && (!dayFilter || c.schedules.map(schedule => schedule.dayOfWeek).includes(dayFilter.toString()))
        && (!levelFilter || c.levelId === levelFilter.id)
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
