import {useEffect, useState } from "react";

import type {
  FrequencyCardStudent,
  FrequencyStatus,
} from "../../components/FrequencyCard/interface";
import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useAttendances } from "../../hooks/useAttendances";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";

export function useFrequencyCall() {
  const { getActivityTitleById } = useActivities();
  const { getClassTitleById } = useClasses();
  const { getDate } = useDateInput();
  const { getPathParamId } = useRoutes();
  const { showToast } = useToast();
  const [students, setStudents] = useState<FrequencyCardStudent[] | []>([]);

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? "" : getActivityTitleById(activityId);

  const classId = getPathParamId("turmas");
  const classTitle = !classId ? "" : getClassTitleById(classId);

  const date = getDate("1");

  const {
    attendances,
    createAttendanceClass,
    updateAttendanceClass,
    refetchAttendances,
  } = useAttendances(Number(classId), date);

  useEffect(() => {
    if (!attendances) {
      setStudents([]);
      return;
    }

    const frequencyCards: FrequencyCardStudent[] = (
      attendances?.studentList ?? []
    )
      .filter((f) => f && f.studentId !== undefined)
      .map((frequency) => ({
        id: frequency.studentId?.toString() ?? "",
        name: frequency.studentFullName ?? "Sem nome",
        frequencyPercent: frequency.attendancePercetage ?? 0,
        isPresent: frequency.status ?? "AUSENTE",
        notes: frequency.notes ?? "",
      }));

    setStudents(frequencyCards);
  }, [attendances]);

  function updatePresence(id: string, present: FrequencyStatus) {

    if (students.length > 0) {
      setStudents((prevList) =>
        prevList.map((i) => (i.id.toString() === id ? { ...i, isPresent: present } : i))
      );
    }
  }

  async function registerCall() {
    const date = getDate("1");

    await createAttendanceClass(Number(classId), date);

    if (!students) {
      return showToast(strings.frequencyCall.errorNoStudents, "error", true);
    }

    if (!date) {
      return showToast(strings.frequencyCall.errorNoDate, "error", true);
    }

    showToast(strings.frequencyCall.successSave, "success", true);
    await refetchAttendances();
    return;
  }

  async function updateCall() {
    const date = getDate("1");

    await updateAttendanceClass({
      classId: Number(classId),
      date: date,
      studentList: attendances?.studentList || [],
    });

    if (!students) {
      return showToast(strings.frequencyCall.errorNoStudents, "error", true);
    }

    if (!date) {
      return showToast(strings.frequencyCall.errorNoDate, "error", true);
    }

    return showToast(strings.frequencyCall.successSave, "success", true);
  }

  return {
    students,
    updatePresence,
    registerCall,
    updateCall,
    activityTitle,
    classTitle,
  };
}
