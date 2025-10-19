import type { Address } from "./address";
import { api, endpoints } from "./api";
import type { EmploymentStatus, Gender, Race, SocialProgram } from "./filters";

export type Student = {
  id: string;
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

export type StudentResponsible = {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  civilState: string;
  nis: string;
  phone: string;
  email: string;
  address: string;
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
    const response = await api.post(endpoints.students, student);
    return response.data;
  } catch {
    throw new Error("Error registering student");
  }
}

export async function addStudentDocument<Doc>(studentId: Pick<ApiStudent, "id">, document: Doc): Promise<void> {
  try {
    await api.post(`${endpoints.students}/${studentId}/documentos`, document, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch {
    throw new Error("Error adding student document");
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    const response = await api.get<Student[]>(endpoints.students);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [{
        id: `${(++id).toString()}`,
        fullName: "Leonardo Mallet",
        dateOfBirth: new Date("2005-03-10"),
        registrationNumber: "2023001",
        enrollmentDate: new Date("2023-01-15"),
        status: "ATIVO" as StudentStatus,
        level: "ENSINO_MEDIO_1" as SchoolYear,
        address: {
          street: "Rua das Flores",
          number: "123",
          complement: "Apto 101",
          code: "01000-000",
        },
      }, {
        id: `${(++id).toString()}`,
        fullName: "João Pedro",
        dateOfBirth: new Date("2006-07-20"),
        registrationNumber: "2023002",
        enrollmentDate: new Date("2023-02-01"),
        status: "ATIVO" as StudentStatus,
        level: "ENSINO_MEDIO_2" as SchoolYear,
        address: {
          street: "Avenida Brasil",
          number: "456",
          complement: "",
          code: "01400-000",
        },

      }, {
        id: `${(++id).toString()}`,
        fullName: "Pedro Henrique",
        dateOfBirth: new Date("2007-01-05"),
        registrationNumber: "2023003",
        enrollmentDate: new Date("2023-03-10"),
        status: "ATIVO" as StudentStatus,
        level: "ENSINO_MEDIO_1" as SchoolYear,
        address: {
          street: "Rua Augusta",
          number: "789",
          complement: "Casa 2",
          code: "01300-000",
        },

      },],
    });
    return mockResponse.data;
  }
}

export async function getStudentResponsibles({ id: studentId }: Pick<ApiStudent, "id">): Promise<StudentResponsible[]> {
  try {
    const response = await api.get<StudentResponsible[]>(`${endpoints.students}/${studentId}/responsibles`);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: `${(++id).toString()}`,
          name: "Leonardo Scheidt",
          cpf: "123.456.789-00",
          birthDate: "1990-05-15",
          civilState: "Solteiro(a)",
          nis: "12345678900",
          phone: "(11) 91234-5678",
          email: "leonardo@example.com",
          address: "Rua A, 123, São Paulo, SP",
        },
        {
          id: `${(++id).toString()}`,
          name: "Maria Silva",
          cpf: "987.654.321-00",
          birthDate: "1985-10-22",
          civilState: "Casado(a)",
          nis: "98765432100",
          phone: "(21) 99876-5432",
          email: "maria.silva@example.com",
          address: "Avenida B, 456, Rio de Janeiro, RJ",
        },
        {
          id: `${(++id).toString()}`,
          name: "Carlos Oliveira",
          cpf: "111.222.333-44",
          birthDate: "1978-03-08",
          civilState: "Divorciado(a)",
          nis: "11122233344",
          phone: "(31) 98765-4321",
          email: "carlos.oliveira@example.com",
          address: "Rua C, 789, Belo Horizonte, MG",
        },
      ]
    })
    return mockResponse.data;
  }
}
