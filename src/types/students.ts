import type { AddressResponse } from "./address";
import type { EducationLevel, EmploymentStatus, Gender, Race, SchoolYear, SocialPrograms, StudentStatus } from "./filters";
import type { Id } from "./id";


export type Student = {
  id: Id;
  address: AddressResponse;
  fullName: string;
  dateOfBirth: string;
  registrationNumber: string;
  enrollmentDate: string;
  disenrollmentDate?: string;
  status: StudentStatus;
  level: SchoolYear;
  socialName?: string;
  schoolYear?: string;
  race?: Race;
  schoolName?: string;
  schoolShift?: string;
  educationLevel?: EducationLevel;
  socialPrograms?: SocialPrograms;
  gender?: Gender;
  employmentStatus?: EmploymentStatus;
  gradeGap?: boolean;
}

export type ApiStudent = Student & {
  id: Id;
}

export type StudentResponsible = {
  id: Id;
  name: string;
  cpf: string;
  birthDate: string;
  civilState: string;
  nis: string;
  phone: string;
  email: string;
  address: string;
}
