import { api, endpoints } from "./api";
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

export async function getAvailableClasses(): Promise<AvailableClass[]> {
  try {
    const response = await api.get<AvailableClassesResponse>(
      endpoints.frequencies.availableByUser
    );

    return response.data.classes;
  } catch (error) {
    console.error("API Error:", error);

    return []
  }
}

export type GeneralAttendanceStudent = {
  studentId: number;
  fullName: string;
  status: FrequencyStatus;
  generalAttendanceAllowed: boolean;
};

export type GeneralAttendanceResponse = {
  date: string;
  studentList: GeneralAttendanceStudent[];
};

export type UpdateGeneralAttendanceRequest = {
  date: string;
  studentList: {
    studentId: number;
    status: FrequencyStatus;
    generalAttendanceAllowed: boolean;
  }[];
};

export async function getGeneralAttendance(date: string): Promise<GeneralAttendanceResponse> {
  const response = await api.get<GeneralAttendanceResponse>(`/frequency/general-attendance?date=${date}`);
  return response.data;
}

export async function updateGeneralAttendance(data: UpdateGeneralAttendanceRequest): Promise<void> {
  await api.patch("/frequency/general-attendance", data);
}

export type ClassStudentUpdateResponse = {
    studentId: number;
    frequencyId: number;
    status: FrequencyStatus;
    notes: NoteTypes | null;
  }

export type ClassStudentResponse = {
  studentId: number;
  frequencyId: number;
  studentFullName: string;
  attendancePercetage: number;
  status: FrequencyStatus;
  notes: NoteTypes | null;
}

export type RegisterClassAttendance = {
  classId: number;
  date: string;
}

export type ClassAttendence = {
  classId: number;
  date: string;
  studentList: ClassStudentResponse[]
} 

export type UpdateClassAttendance = {
  classId: number;
  date: string;
  studentList: ClassStudentUpdateResponse[]
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

export async function registerAttendanceClass(body: RegisterClassAttendance): Promise<ClassAttendence> {
  const response =  await api.post<ClassAttendence>("/frequency/class-attendance", body);
  return response.data;
}


export async function editAttendanceClass(body: UpdateClassAttendance): Promise<UpdateClassAttendance> {
  const respose = await api.patch<UpdateClassAttendance>("/frequency/class-attendance", body);
  return respose.data;
}