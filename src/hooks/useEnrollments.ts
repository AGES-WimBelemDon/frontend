import { useQuery } from "@tanstack/react-query";

import { useClasses } from "./useClasses";
import { getEnrollment, getEnrollmentByClassId as apiGetEnrollmentByClassId } from "../services/enrollments";
import type { EnrollmentDetails } from "../types/enrollment";
import type { Id } from "../types/id";

export function useEnrollment() {
  const { isPending, error, data } = useQuery({
    queryKey: ["enrollment"],
    queryFn: getEnrollment,
  });

  const { currentClassId, selectClass, classes } = useClasses();

  async function getEnrollmentByClassId(id: Id | null): Promise<EnrollmentDetails[]> {
    if (!id) {
      return [];
    }
    const classItem = await apiGetEnrollmentByClassId(id);
    const getClassDetails = (classId: Id) => classes?.find((c) => c.id === classId);
    return classItem.map((item) => {
      const classDetails = getClassDetails(item.class.id);
      return {
        ...item,
        teachers: classDetails?.teachers ?? [],
      } as EnrollmentDetails;
    });
  }

  const { isPending: isLoadingClassEnrollment, error: errorClassEnrollment, data: classEnrollment } = useQuery({
    queryKey: ["class-enrollment", currentClassId],
    queryFn: () => getEnrollmentByClassId(currentClassId),
    enabled: currentClassId !== null
  })

  return {
    isLoadingEnrollment: isPending,
    enrollmentError: error,
    enrollment: data,
    isLoadingClassEnrollment,
    classEnrollmentError: errorClassEnrollment,
    classEnrollment,
    selectClass,
  }

}