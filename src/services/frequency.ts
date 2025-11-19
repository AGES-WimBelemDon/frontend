import { api, endpoints } from "./api";
import type { AvailableClass, AvailableClassesResponse, ClassAttendence, GeneralAttendanceResponse, RegisterClassAttendance, UpdateClassAttendance, UpdateGeneralAttendanceRequest } from "../types/frequency";
import type { Id } from "../types/id";

export async function getAvailableClasses(): Promise<AvailableClass[]> {
  try {
    const response = await api.get<AvailableClassesResponse>(
      endpoints.frequencies.availableByUser
    );

    return response.data.classes;
  } catch {
    throw new Error("Error on servicesGetAvailableClasses");
  }
}

export async function getGeneralAttendance(date: string): Promise<GeneralAttendanceResponse> {
  try {
    const response = await api.get<GeneralAttendanceResponse>(`/frequency/general-attendance?date=${date}`);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetGeneralAttendance");
  }
}

export async function updateGeneralAttendance(data: UpdateGeneralAttendanceRequest): Promise<void> {
  try {
    await api.patch("/frequency/general-attendance", data);
  } catch {
    throw new Error("Error on servicesUpdateGeneralAttendance");
  }
}

export async function getAttendanceClass(classId: Id, date: string): Promise<ClassAttendence> {
  try {
    const response = await api.get<ClassAttendence>("/frequency/class-attendance", {
      params: { classId, date },
    });
    return response.data;
  } catch {
    throw new Error("Error on servicesGetAttendanceClass");
  }
}

export async function registerAttendanceClass(body: RegisterClassAttendance): Promise<ClassAttendence> {
  try {
    const response = await api.post<ClassAttendence>("/frequency/class-attendance", body);
    return response.data;
  } catch {
    throw new Error("Error on servicesRegisterAttendanceClass");
  }
}


export async function editAttendanceClass(body: UpdateClassAttendance): Promise<UpdateClassAttendance> {
  try {
    const response = await api.patch<UpdateClassAttendance>("/frequency/class-attendance", body);
    return response.data;
  } catch {
    throw new Error("Error on servicesEditAttendanceClass");
  }
}
