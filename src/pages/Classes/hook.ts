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

const mockClasses = [
  {
    id: 1,
    title: "Yoga para Iniciantes",
    classes: {
      weekDay: "Segunda-feira",
      schedule: "08:00 - 09:00",
      level: "Iniciante",
    },
  },
  {
    id: 2,
    title: "Treino Funcional",
    classes: {
      weekDay: "Terça-feira",
      schedule: "18:30 - 19:30",
      level: "Intermediário",
    },
  },
  {
    id: 3,
    title: "Aula de Dança",
    classes: {
      weekDay: "Quarta-feira",
      schedule: "19:00 - 20:00",
      level: "Todos os níveis",
    },
  },
  {
    id: 4,
    title: "Pilates Avançado",
    classes: {
      weekDay: "Quinta-feira",
      schedule: "07:00 - 08:00",
      level: "Avançado",
    },
  },
  {
    id: 5,
    title: "Cross Training",
    classes: {
      weekDay: "Sábado",
      schedule: "10:00 - 11:30",
      level: "Intermediário",
    },
  },
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
    mockClasses,
  };
}
