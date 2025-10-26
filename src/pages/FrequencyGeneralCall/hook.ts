import { useEffect, useState, useCallback } from "react";

import type { GeneralCallStudent } from "./interface";
import type { FrequencyStatus } from "../../components/FrequencyCard/interface";
import { useDateInput } from "../../components/Inputs/DateInput/hook";
import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { getGeneralAttendance, updateGeneralAttendance } from "../../services/frequency";

export function useFrequencyGeneralCall() {
  const { getDate, setDate } = useDateInput();
  const { showToast } = useToast();

  const [students, setStudents] = useState<GeneralCallStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
    const today = formatDate(new Date());
    setDate(today, "1");
    void loadGeneralAttendance(today);
  }, [setDate, loadGeneralAttendance]);

  useEffect(() => {
    const date = getDate("1");
    if (date && date !== currentDate) {
      setCurrentDate(date);
      void loadGeneralAttendance(date);
    }
  }, [getDate, currentDate, loadGeneralAttendance]);

  function updatePresence(studentId: number, present: FrequencyStatus) {
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
          observation: student.observation || undefined,
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
