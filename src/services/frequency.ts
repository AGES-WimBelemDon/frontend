import { api } from "./api";
import { FrequencyStatus, NoteTypes } from "../components/FrequencyCard/interface";

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
  try {
    const response = await api.get<AvailableClassesResponse>(
      `/frequency/available-classes/${userId}`
    );

    return response.data.classes;
  } catch (error) {
    console.error("API Error:", error);

    return []
  }
}

export type GeneralAttendanceStudent = {
  studentId: number;
  studentName: string;
  status: FrequencyStatus;
  generalAttendanceAllowed: boolean;
  observation: NoteTypes | null;
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

export type ClassStudent = {
  studentId: number;
  studentName: string;
  frequencyPercent: number;
  isPresent: boolean;
}

export type ClassStudentResponse = {
  studentId: number;
  frequencyId: number;
  studentFullName: string;
  attendancePercetage: number;
  status: FrequencyStatus;
  notes: NoteTypes;
}

export type ClassAttendence = {
  classId: number;
  date: string;
  studentList: ClassStudentResponse[]
} 

export async function getAttendanceClass(classId: number, date: string): Promise<ClassAttendence> {
  const response  = await api.get<ClassAttendence>("/frequency/class-attendance", {
    params: {
      classId: classId,
      date: date
    }
  })
  return response.data;
}

export async function registerAttendanceClass(body: ClassAttendence): Promise<ClassAttendence> {
  const response =  await api.post<ClassAttendence>("/frequency/class-attendance", body);
  return response.data;
}


export async function updateAttendanceClass(body: ClassAttendence): Promise<ClassAttendence> {
  const respose = await api.patch("/frequency/class-attendance", body);
  return respose.data;
}