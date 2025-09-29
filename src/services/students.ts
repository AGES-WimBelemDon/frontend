import type { Address } from "./address";
import { api } from "./api";
import type { EmploymentStatus, Gender, Race, SocialProgram } from "./filters";

type StudentRecord = {
  id: string;
  name: string;
  frequencyPercent: number;
};

export type Student = {
  address: Address;
  fullName: string;
  dateOfBirth: Date;
  registrationNumber: string;
  enrollmentDate: Date;
  disenrollmentDate?: Date;
  status: StudentStatus;
  level: SchoolYear;
  socialName?: string;
  race?: Race;
  schoolName?: string;
  schoolShift?: string;
  schoolYear?: EducationLevel;
  socialProgram?: SocialProgram;
  gender?: Gender;
  employmentStatus?: EmploymentStatus;
  gradeGap?: boolean;
}

type ApiStudent = Student & {
  id: string;
}

export type StudentStatus = 
  | "ATIVO"
  | "INATIVO"
;

export type SchoolYear = 
  | "EDUCACAO_INFANTIL"
  | "FUNDAMENTAL_1"
  | "FUNDAMENTAL_2"
  | "ENSINO_MEDIO_1"
  | "ENSINO_MEDIO_2"
  | "ENSINO_MEDIO_3"
  | "EJA"
;

export type EducationLevel =
  | "NENHUM"
  | "ALFABETIZADO"
  | "FUNDAMENTAL_INCOMPLETO"
  | "FUNDAMENTAL_COMPLETO"
  | "ENSINO_MEDIO_INCOMPLETO"
  | "ENSINO_MEDIO_COMPLETO"
  | "SUPERIOR_INCOMPLETO"
  | "SUPERIOR_COMPLETO"
  | "POS_GRADUACAO"
;

export async function registerStudent(student: Partial<Student>): Promise<Pick<ApiStudent, "id">> {
  try {
    const response = await api.post("/alunos", student);
    return response.data;
  } catch {
    throw new Error("Error registering student");
  }
}

export async function addStudentDocument<Doc>(studentId: Pick<ApiStudent, "id">, document: Doc): Promise<void> {
  try {
    await api.post(`/alunos/${studentId}/documentos`, document, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch {
    throw new Error("Error adding student document");
  }
}

export async function getStudents(): Promise<StudentRecord[]> {
  try {
    const response = await api.get<StudentRecord[]>("/alunos");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          name: "Leonardo Mallet",
          frequencyPercent: 90,
        },
        {
          id: (++id).toString(),
          name: "João Pedro",
          frequencyPercent: 60,
        },
        {
          id: (++id).toString(),
          name: "Pedro Henrique",
          frequencyPercent: 40,
        },
        {
          id: (++id).toString(),
          name: "Thiago Camargo",
          frequencyPercent: 55,
        },
        {
          id: (++id).toString(),
          name: "Paulo Camargo",
          frequencyPercent: 55,
        },
        {
          id: (++id).toString(),
          name: "Mayara Cardi",
          frequencyPercent: 55,
        },
      ],
    });
    return mockResponse.data;
  }
}
