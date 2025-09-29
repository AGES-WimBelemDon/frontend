import { useMemo, useState } from "react";

import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useScreenSize } from "../../hooks/useScreenSize";

const weekDays = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
  "Domingo"
];

const levels = [
  "Iniciante",
  "Intermediário",
  "Avançado"
];

export function useClassesPage() {
  const { activities } = useActivities();
  const { isLoadingClasses, classesError, classes } = useClasses();
  const { goTo } = useRoutes();
  const { deviceSize } = useScreenSize();

  const [activityFilter, setActivityFilter] = useState<string | null>(null);
  const [dayFilter, setDayFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const filteredClasses = useMemo(() => {
    if (isLoadingClasses || classesError || !classes) {
      return [];
    }
    return classes.filter((c) => {
      return (
        (!activityFilter || c.title.includes(activityFilter)) &&
        (!dayFilter || true) &&
        (!levelFilter || true)
      );
    });
  }, [isLoadingClasses, classesError, classes, activityFilter, dayFilter, levelFilter]);

  return {
    isLoadingClasses,
    classesError,
    activities,
    activityFilter,
    setActivityFilter,
    dayFilter,
    setDayFilter,
    weekDays,
    levelFilter,
    setLevelFilter,
    levels,
    goTo,
    deviceSize,
    filteredClasses,
  };
}
