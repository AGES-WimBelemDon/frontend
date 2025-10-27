import { useEffect, useState } from "react";

import type { FrequencyCardStudent } from "../../components/FrequencyCard/interface";
import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";

export function useFrequencyCall() {
  const { getActivityTitleById } = useActivities();
  const { getClassTitleById, frequencyClass: apiStudents } = useClasses();
  const { getDate } = useDateInput();
  const { getPathParamId } = useRoutes();
  const { showToast } = useToast();

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? ""
    : getActivityTitleById(activityId);

  const classTitle = getClassTitleById();

  const [students, setStudents] = useState<FrequencyCardStudent[]>([]);

  useEffect(() => {
    if (apiStudents) {
      setStudents(apiStudents.map(apiStudent => ({
        id: apiStudent.id,
        name: apiStudent.name,
        frequencyPercent: apiStudent.frequency,
        isPresent: true
      })));
    }
  }, [apiStudents]);

  function updatePresence(id: number, present: boolean) {
    setStudents((prevList) =>
      prevList.map((i) =>
        i.id === id ? { ...i, isPresent: present } : i
      )
    );
  };

  function registerCall() {
    const date = getDate("1");

    if (!students) {
      return showToast(strings.frequencyCall.errorNoStudents, "error", true);
    }

    if (!date) {
      return showToast(strings.frequencyCall.errorNoDate, "error", true);
    }

    return showToast(strings.frequencyCall.successSave, "success", true);
  };

  return {
    students,
    updatePresence,
    registerCall,
    activityTitle,
    classTitle,
  };
}
