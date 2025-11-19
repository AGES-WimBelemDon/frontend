import { useEffect, useState, useCallback } from "react";

import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { getGeneralAttendance, updateGeneralAttendance } from "../../services/frequency";
import type { FrequencyStatus } from "../../types/filters";
import type { GeneralAttendanceStudent } from "../../types/frequency";
import type { Id } from "../../types/id";

export function useFrequencyGeneralCall() {
  const { getDate, setDate } = useDateInput();
  const { showToast } = useToast();
  const date = getDate("1");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [students, setStudents] = useState<GeneralAttendanceStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadGeneralAttendance = useCallback(async (date: string) => {
    setIsLoading(true);
    try {
      const response = await getGeneralAttendance(date);

      const allowedStudents = response.studentList.filter(
        (student) => student.generalAttendanceAllowed
      );

      setStudents(allowedStudents);
    } catch (error: unknown) {
      console.error("Error loading general attendance:", error);

      // Use optional chaining e type guard para unknown
      const status = (error as { response?: { status?: number } })?.response?.status;

      if (status === 404) {
        showToast(strings.frequencyGeneralCall.errorInvalidDate, "error", true);
      } else if (status === 500) {
        showToast(strings.frequencyGeneralCall.errorServer, "error", true);
      } else {
        showToast(strings.frequencyGeneralCall.studentsError, "error", true);
      }

      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (isFirstLoad) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setDate(formattedDate, "1");
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, setDate])  ;

  useEffect(() => {
    if (!date) return;

    void loadGeneralAttendance(date);
  }, [date, loadGeneralAttendance]);

  function updatePresence(studentId: Id, present: FrequencyStatus) {
    setStudents((prevList) =>
      prevList.map((student) =>
        student.studentId === studentId
          ? { ...student, status: present }
          : student
      )
    );
  }

  async function registerCall() {
    const date = getDate("1");

    if (!students || students.length === 0) {
      return showToast(strings.frequencyGeneralCall.errorNoStudents, "error", true);
    }

    if (!date) {
      return showToast(strings.frequencyGeneralCall.errorNoDate, "error", true);
    }

    setIsLoading(true);

    try {
      await updateGeneralAttendance({
        date,
        studentList: students.map((student) => ({
          studentId: student.studentId,
          status: student.status,
          generalAttendanceAllowed: student.generalAttendanceAllowed,
        })),
      });

      showToast(strings.frequencyGeneralCall.successSave, "success", true);
    } catch (error: unknown) {
      console.error("Error saving general attendance:", error);

      const status = (error as { response?: { status?: number } })?.response?.status;

      if (status === 404) {
        showToast(strings.frequencyGeneralCall.errorInvalidDate, "error", true);
      } else if (status === 500) {
        showToast(strings.frequencyGeneralCall.errorServer, "error", true);
      } else {
        showToast(strings.frequencyGeneralCall.studentsError, "error", true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    students,
    updatePresence,
    registerCall,
    isLoading,
  };
}
