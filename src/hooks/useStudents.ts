import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../services/students";

export function useStudents() {
  const { isPending, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  return {
    isLoadingStudents: isPending,
    studentsError: error,
    students: data,
  };
}
