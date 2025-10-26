import { api } from "./api";

export type AvailableClass = {
  classId: number;
  className: string;
  classState: string;
  levelName: string | null;
  isGeral: boolean;
  activity: {
    activityId: number;
    activityName: string;
  };
};

export type AvailableClassesResponse = {
  classes: AvailableClass[];
};

export async function getAvailableClasses(userId: string): Promise<AvailableClass[]> {
  const response = await api.get<AvailableClassesResponse>(`/frequency/available-classes/${userId}`);
  return response.data.classes;
}

export type GeneralAttendanceStudent = {
  studentId: number;
  studentName: string;
  status: "PRESENTE" | "AUSENTE";
  generalAttendanceAllowed: boolean;
  observation: string | null;
};

export type GeneralAttendanceResponse = {
  date: string;
  studentList: GeneralAttendanceStudent[];
};

export type UpdateGeneralAttendanceRequest = {
  date: string;
  studentList: {
    studentId: number;
    status: "PRESENTE" | "AUSENTE";
    generalAttendanceAllowed: boolean;
    observation?: string;
  }[];
};

export async function getGeneralAttendance(date: string): Promise<GeneralAttendanceResponse> {
  const response = await api.get<GeneralAttendanceResponse>(`/frequency/general-attendance?date=${date}`);
  return response.data;
}

export async function updateGeneralAttendance(data: UpdateGeneralAttendanceRequest): Promise<void> {
  await api.patch("/frequency/general-attendance", data);
}
