import type { FrequencyStatus, NoteTypes } from "../../components/FrequencyCard/interface";

export interface GeneralCallStudent {
  studentId: number;
  studentName: string;
  status: FrequencyStatus;
  generalAttendanceAllowed: boolean;
  observation: NoteTypes| null;
}

export interface FrequencyGeneralCallState {
  students: GeneralCallStudent[];
  date: string;
}
