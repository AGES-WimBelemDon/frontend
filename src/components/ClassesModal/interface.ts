import type { Dayjs } from "dayjs";

import type { Student } from "../../services/students";
import type { UserResponse } from "../../types/user.types";

export type ClassesModalData = {
  activity: string;
  level: string;
  periodicity: string;
  date: string;
  active: string;
}

export interface FilterProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export type ClassesModalForm = {
  level: string;
  recurring: boolean;
  weekDays: string[];
  startTime: Dayjs | null;
  endTime: Dayjs | null;
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
  createClass(data: ClassesModalForm): boolean;
  openClassesModal(): void;
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTeachers: React.Dispatch<React.SetStateAction<string[]>>;
  filtredStudents: Student[];
  filtredUsers: UserResponse[];
}
