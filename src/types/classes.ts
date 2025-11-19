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
  startTime: string;
  endTime: string;
  schedules: WeekDay[];
  studentIds?: Id[];
}

export type WeekDay = {
  id: Id;
  dayOfWeek: string;
}

export type ApiClass = Classes & {
  startTime: string;
  endTime: string;
};

export type CreateEnrollment = {
  classId: Id;
  studentIds: Id[];
}

export type CreateClass = Omit<Classes, "teachers" | "schedules"> & ApiClass & {
  teacherIds: Id[];
  dayOfWeek: Id[];
}

export type CreateClassForm = Pick<CreateEnrollment, "studentIds"> & Omit<CreateClass, "startTime" | "endTime"> & { dayOfWeekSelection?: WeekDay[]; startTime?: Date | null; endTime?: Date | null }

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
