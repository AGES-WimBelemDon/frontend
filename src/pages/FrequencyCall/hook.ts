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
  const { getDate, setDate } = useDateInput();
  const { getPathParamId } = useRoutes();
  const { showToast } = useToast();
  const [students, setStudents] = useState<FrequencyCardStudent[] | []>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [existingAttendance, setExistingAttendance] = useState(false);

  const activityId = getPathParamId("atividades");
  const activityTitle = !activityId ? "" : getActivityTitleById(activityId);

  const classId = getPathParamId("turmas");
  const classTitle = !classId ? "" : getClassTitleById(classId);

  const date = getDate("1");

  const classIdNumber = classId && !isNaN(Number(classId)) ? Number(classId) : 0;

  const {
    attendances,
    createAttendanceClass,
    updateAttendanceClass,
    refetchAttendances,
    attendancesError,
  } = useAttendances(classIdNumber, date);

  useEffect(() => {
    if (isFirstLoad) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setDate(formattedDate, "1");
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, setDate]);

  useEffect(() => {
    if (!attendances) {
      setStudents([]);
      setExistingAttendance(false);
      return;
    }

    setExistingAttendance(true);

    const frequencyCards: FrequencyCardStudent[] = (
      attendances?.studentList ?? []
    )
      .filter((f) => f && f.studentId !== undefined)
      .map((frequency) => ({
        id: frequency.studentId?.toString() ?? "",
        name: frequency.studentFullName ?? "Sem nome",
        frequencyPercent: frequency.attendancePercetage ?? 0,
        isPresent: frequency.status ?? "AUSENTE",
        notes: frequency.notes ?? "SEM_JUSTIFICATIVA",
      }));

    setStudents(frequencyCards);
  }, [attendances]);

  useEffect(() => {
    if (attendancesError) {
      const error = attendancesError as unknown as { response?: { status?: number } };
      if (error.response?.status === 404) {
        setExistingAttendance(false);
        setStudents([]);
      }
    }
  }, [attendancesError]);

  function updatePresence(id: string, present: FrequencyStatus) {
    setStudents((prevList) =>
      prevList.map((student) => 
        student.id.toString() === id 
          ? { ...student, isPresent: present } 
          : student
      )
    );
  }

  async function saveCall() {
    const currentDate = getDate("1");

    if (!currentDate) {
      return showToast(strings.frequencyCall.errorNoDate, "error", true);
    }

    if (!students || students.length === 0) {
      return showToast(strings.frequencyCall.errorNoStudents, "error", true);
    }

    try {
      if (!existingAttendance) {
        await createAttendanceClass(classIdNumber, currentDate);
        showToast(strings.frequencyCall.successSave, "success", true);
        setExistingAttendance(true);
        await refetchAttendances();
      } else {
        const studentListToSend = students.map((student) => {
          const originalStudent = attendances?.studentList?.find(
            (s) => s.studentId.toString() === student.id
          );
          
          return {
            frequencyId: originalStudent?.frequencyId ?? 0,
            studentId: Number(student.id),
            studentFullName: student.name,
            attendancePercentage: student.frequencyPercent,
            status: student.isPresent,
            notes: student.isPresent === "AUSENTE" ? student.notes : undefined,
          };
        });

        await updateAttendanceClass({
          classId: classIdNumber,
          date: currentDate,
          studentList: studentListToSend as any,
        });
        
        showToast(strings.frequencyCall.successSave, "success", true);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      const err = error as { response?: { status?: number; data?: { message?: string } } };
      const status = err.response?.status;
      
      if (status === 400) {
        showToast("Erro: Formato de requisição inválido", "error", true);
      } else if (status === 404) {
        showToast("Erro: Turma não encontrada", "error", true);
      } else if (status === 500) {
        showToast("Erro: Erro interno do servidor", "error", true);
      } else {
        showToast("Erro ao salvar chamada", "error", true);
      }
    }
  }

  return {
    students,
    updatePresence,
    saveCall,
    activityTitle,
    classTitle,
    existingAttendance,
  };
}
