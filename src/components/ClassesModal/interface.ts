import type { Classes } from "../../types/classes";
import type { Student } from "../../types/students";
import type { UserResponse } from "../../types/users";

export interface ClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData?: Classes;
}

export interface FilterProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseClassesModalReturn {
  nameStudent: string;
  nameTeacher: string;
  selectedStudents: string[];
  selectedTeachers: string[];
  setNameStudent: React.Dispatch<React.SetStateAction<string>>;
  setNameTeacher: React.Dispatch<React.SetStateAction<string>>;
  createClass(data: Classes): boolean;
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTeachers: React.Dispatch<React.SetStateAction<string[]>>;
  filtredStudents: Student[];
  filtredUsers: UserResponse[];
}
