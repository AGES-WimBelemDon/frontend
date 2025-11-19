import type { FrequencyStatus, NoteTypes } from "./filters";
import type { Id } from "./id";

export type AvailableClass = {
  classId: Id;
  className: string;
  classState: string;
  levelName: string | null;
  isGeral: boolean;
  activity: {
    activityId: Id;
    activityName: string;
  };
};

export type AvailableClassesResponse = {
  classes: AvailableClass[];
};

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
    studentId: Id;
    status: FrequencyStatus;
    generalAttendanceAllowed: boolean;
  }[];
};

export type ClassStudentUpdateResponse = {
  studentId: Id;
  frequencyId: Id;
  status: FrequencyStatus;
  notes: NoteTypes | null;
}

export type ClassStudentResponse = {
  studentId: Id;
  frequencyId: Id;
  studentFullName: string;
  attendancePercentage: number;
  status: FrequencyStatus;
  notes: NoteTypes | null;
}

export type RegisterClassAttendance = {
  classId: Id;
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

export type FrequencyCardStudent = {
  id: Id;
  name: string;
  frequencyPercent: number;
  isPresent: FrequencyStatus;
  notes: NoteTypes | null;
}
