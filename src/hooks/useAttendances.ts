import { useQuery, useQueryClient } from "@tanstack/react-query";

import { editAttendanceClass, getAttendanceClass, registerAttendanceClass, type ClassAttendence } from "../services/frequency";

export function useAttendances(classId: number, date: string) {
  const queryClient = useQueryClient();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["attendances", classId, date],
    queryFn: () => getAttendanceClass(classId, date)
  });
      
  async function createAttendanceClass(classId: number, date: string): Promise<ClassAttendence> {
    const response = await registerAttendanceClass({ classId, date } );
    await queryClient.invalidateQueries({
      queryKey: ["attendances", classId, date],
    });
    return response;
  }

  async function updateAttendanceClass(body: ClassAttendence) : Promise<ClassAttendence>{
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
    refetchAttendances : refetch,
    createAttendanceClass,
    updateAttendanceClass,
  }

}