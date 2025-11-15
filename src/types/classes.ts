import type { Dayjs } from "dayjs";

import type { Id } from "./id";
import type { UserResponse } from "./users";

export type Classes = {
  name: string;
  activityId: Id;
  levelId: Id;
  state: string;
  teachers: UserResponse[];
  isRecurrent: boolean;
  startDate: string;
  endDate: string;
  startTime: Dayjs;
  endTime: Dayjs;
  weekDay: string[];
}

export type ApiClass = Classes & {
  id: Id;
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
