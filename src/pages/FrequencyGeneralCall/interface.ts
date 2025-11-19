import type { FrequencyStatus, NoteTypes } from "../../types/filters";

export interface GeneralCallStudent {
  studentId: number;
  studentName: string;
  status: FrequencyStatus;
  generalAttendanceAllowed: boolean;
  observation: NoteTypes | null;
}

export interface FrequencyGeneralCallState {
  students: GeneralCallStudent[];
  date: string;
}
