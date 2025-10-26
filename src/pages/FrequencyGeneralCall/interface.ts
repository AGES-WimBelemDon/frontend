export interface GeneralCallStudent {
  studentId: number;
  studentName: string;
  status: "PRESENTE" | "AUSENTE";
  generalAttendanceAllowed: boolean;
  observation: string | null;
}

export interface FrequencyGeneralCallState {
  students: GeneralCallStudent[];
  date: string;
}
