import type { Dayjs } from "dayjs";

import type { ClassState } from "./filters";
import type { Id } from "./id";
import type { UserResponse } from "./users";

export type CreateClasses = {
  name: string;
  activityId: Id;
  levelId: Id;
  teacherIds: Id[];
  isRecurrent: boolean;
  startDate: string;
  endDate: string | null;
  startTime: string;
  endTime: string;
  dayOfWeek: string[];
}

export type Classes = {
  id: Id;
  name: string;
  activityId: Id;
  levelId: Id;
  state: ClassState;
  teachers: UserResponse[];
  isRecurrent: boolean;
  startDate: string;
  endDate: string | null;
  startTime: Dayjs;
  endTime: Dayjs;
  schedules: WeekDay[];
}

export type WeekDay = {
  id: Id;
  dayOfWeek: string;
}

export type ApiClass = Classes & {
  startTime: string;
  endTime: string;
};

export type StudentFrequency = {
  id: Id;
  name: string;
  frequency: number;
}

export type StudentFrequencyClass = {
  classId: Id;
  date: string;
  studentList: StudentFrequency[];
}
