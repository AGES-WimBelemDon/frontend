import {useEffect, useState } from "react";

import type {
  FrequencyCardStudent,
  FrequencyStatus,
  NoteTypes,
} from "../../components/FrequencyCard/interface";
import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useActivities } from "../../hooks/useActivities";
import { useAttendances } from "../../hooks/useAttendances";
import { useClasses } from "../../hooks/useClasses";
import { useRoutes } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import type { ClassStudentUpdateResponse } from "../../services/frequency";

export function useFrequencyCall() {
  const { getActivityTitleById } = useActivities();
  const { getClassTitleById } = useClasses();
  const { getDate, setDate } = useDateInput();
  const { getPathParamId } = useRoutes();
  const { showToast } = useToast();
  const [students, setStudents] = useState<FrequencyCardStudent[] | []>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
    if (isFirstLoad) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setDate(formattedDate, "1");
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, setDate])  ;

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
        notes: frequency.notes,
      }));
    setStudents(frequencyCards);
  }, [attendances]);

  

  function updatePresence(id: string, present: FrequencyStatus) {
    setStudents((prevList) =>
      prevList.map((student) => 
        student.id === id 
          ? { ...student, isPresent: present } 
          : student
      )
    );
  }

  function updateNote(id: string, note: NoteTypes) {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? { ...student, notes: note }
          : student
      )
    );
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
  
    if (!students || students.length === 0) {
      return showToast(strings.frequencyCall.errorNoStudents, "error", true);
    }
  
    if (!date) {
      return showToast(strings.frequencyCall.errorNoDate, "error", true);
    }

    const studentList: ClassStudentUpdateResponse[] = students.map(student => ({
      studentId: Number(student.id),
      frequencyId:
        attendances?.studentList.find(f => f.studentId === Number(student.id))
          ?.frequencyId ?? 0,
      status: student.isPresent,
      notes: student.notes,
    }));
  
    try {
      await updateAttendanceClass({
        classId: Number(classId),
        date,
        studentList,
      });
  
      return showToast(strings.frequencyCall.successSave, "success", true);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    students,
    updatePresence,
    updateCall,
    registerCall,
    updateNote,
    activityTitle,
    classTitle
  };
}
