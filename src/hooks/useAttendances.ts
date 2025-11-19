import { useQuery, useQueryClient } from "@tanstack/react-query";

import { editAttendanceClass, getAttendanceClass, registerAttendanceClass } from "../services/frequency";
import type { ClassAttendence, UpdateClassAttendance } from "../types/frequency";
import type { Id } from "../types/id";

export function useAttendances(classId: Id, date: string) {
  const queryClient = useQueryClient();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["attendances", classId, date],
    queryFn: () => getAttendanceClass(classId, date)
  });

  async function createAttendanceClass(classId: Id, date: string): Promise<ClassAttendence> {
    const response = await registerAttendanceClass({ classId, date });
    await queryClient.invalidateQueries({
      queryKey: ["attendances", classId, date],
    });
    return response;
  }

  async function updateAttendanceClass(body: UpdateClassAttendance): Promise<UpdateClassAttendance> {
    const response = await editAttendanceClass(body)
    await queryClient.invalidateQueries({
      queryKey: ["attendances", classId, date],
    });
    return response
  }

  return {
    isLoadingAttendances: isPending,
    attendancesError: error,
    attendances: data,
    refetchAttendances: refetch,
    createAttendanceClass,
    updateAttendanceClass,
  }
}
