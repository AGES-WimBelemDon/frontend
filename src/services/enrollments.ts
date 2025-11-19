import { api, endpoints } from "./api";
import type { CreateEnrollment } from "../types/classes";
import type { Enrollment } from "../types/enrollment";
import type { Id } from "../types/id";

export async function createEnrollment(enrollment: CreateEnrollment): Promise<void> {
  try {
    return api.post(endpoints.enrollments.base, enrollment);
  } catch {
    throw new Error("Error on servicesCreateEnrollment");
  }
}

export async function getEnrollment(): Promise<Enrollment[]> {
  try {
    const response = await api.get<Enrollment[]>(endpoints.enrollments.base);
    return response.data
  } catch {
    return []
  }
}

export async function getEnrollmentByClassId(classid: Id): Promise<Enrollment[]> {
  try {
    const response = await api.get<Enrollment[]>(endpoints.enrollments.byClassId(classid));
    return response.data
  } catch {
    throw new Error("Error on servicesGetEnrollmentByClassId")
  }
}
