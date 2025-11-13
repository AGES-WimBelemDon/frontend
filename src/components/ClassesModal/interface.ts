import type { Dayjs } from "dayjs";

import type { Student } from "../../types/students";
import type { UserResponse } from "../../types/users";

export interface FilterProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export type Classes = {
  name: string;
  activityId: number;
  levelId: string;
  state: string;
  teachersId: number[];
  isRecurrent: boolean;
  startDate: string;
  endDate: string;
  startTime: Dayjs;
  endTime: Dayjs;
  weekDay: string[];
}

export interface UseClassesModalReturn {
  isOpen: boolean;
  nameStudent: string;
  nameTeacher: string;
  selectedStudents: string[];
  selectedTeachers: string[];
  setNameStudent: React.Dispatch<React.SetStateAction<string>>;
  setNameTeacher: React.Dispatch<React.SetStateAction<string>>;
  closeModal(): void;
  createClass(data: Classes): boolean;
  openClassesModal(): void;
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTeachers: React.Dispatch<React.SetStateAction<string[]>>;
  filtredStudents: Student[];
  filtredUsers: UserResponse[];
}
