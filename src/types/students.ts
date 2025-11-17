import type { AddressResponse } from "./address";
import type { EducationLevel, EmploymentStatus, Gender, Race, SchoolYear, SocialPrograms, StudentStatus } from "./filters";


export type Student = {
  id: number;
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
  id: number;
}

export interface StudentResponsible {
  id: number;
  fullName: string;
  relationship: string;
  phoneNumber: string;
  studentIds: number[];
  dateOfBirth: string;
  registrationNumber: string;
  email: string;
  socialName: string;
  race: string;
  gender: string;
  educationLevel: string;
  socialPrograms: string;
  employmentStatus: string;
  nis: string;
  address: AddressResponse;
}
