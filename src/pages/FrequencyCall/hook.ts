import { useEffect, useState } from "react";

import type {
  FrequencyCardStudent,
  FrequencyStatus,
} from "../../components/FrequencyCard/interface";
import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import {
  getAttendanceClass,
  type ClassAttendence,
} from "../../services/frequency";

export function useFrequencyCall() {
  const { getActivityTitleById } = useActivities();
  const { getClassTitleById } = useClasses();
  const { getDate } = useDateInput();
  const { getPathParamId } = useRoutes();
  const { showToast } = useToast();
  const [attendance, setAttendance] = useState<ClassAttendence | undefined>(
    undefined
  );
  const [students, setStudents] = useState<FrequencyCardStudent[] | []>([]);

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? "" : getActivityTitleById(activityId);

  const classId = getPathParamId("turmas");
  const classTitle = !classId ? "" : getClassTitleById(classId);

  const loadClassAttendance = async (classId: number, date: string) => {
    const classAttendence = await getAttendanceClass(classId, date);

    if (!classAttendence) {
      setAttendance(undefined);
      setStudents([]);
      return;
    }

    setAttendance(classAttendence);
  };

  useEffect(() => {
    if (!attendance) return;

    const frequencyCards: FrequencyCardStudent[] = attendance.studentList.map(
      (frequency) => ({
        id: frequency.studentId.toString(),
        name: frequency.studentFullName,
        frequencyPercent: frequency.attendancePercetage,
        isPresent: frequency.status,
        notes: frequency.notes,
      })
    );

    setStudents(frequencyCards);
  }, [attendance]);

  // useEffect(() => {
  //   if (attendance != null && attendance.studentList != null) {
  //     setStudents(apiStudxents.map(apiStudent => ({ ...apiStudent, isPresent: true })));
  //   }
  // }, [apiStudents]);

  function updatePresence(id: string, present: FrequencyStatus) {
    if (students.length > 0) {
      setStudents((prevList) =>
        prevList.map((i) => (i.id === id ? { ...i, isPresent: present } : i))
      );
    }
  }

  function registerCall() {
    const date = getDate("1");

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
    loadClassAttendance,
    registerCall,
    activityTitle,
    classTitle,
  };
}
