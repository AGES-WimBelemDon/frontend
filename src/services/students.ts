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
      data: [
        {
          id: `${++id}`,
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
        },
        {
          id: `${++id}`,
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
        },
        {
          id: `${++id}`,
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
        },
        {
          id: `${++id}`,
          fullName: "Ana Beatriz",
          dateOfBirth: new Date("2008-04-12"),
          registrationNumber: "2023004",
          enrollmentDate: new Date("2023-04-05"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_2" as SchoolYear,
          address: {
            street: "Travessa das Laranjeiras",
            number: "21",
            complement: "Casa",
            code: "02000-100",
          },
        },
        {
          id: `${++id}`,
          fullName: "Carla Souza",
          dateOfBirth: new Date("2009-11-02"),
          registrationNumber: "2023005",
          enrollmentDate: new Date("2023-05-20"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
          address: {
            street: "Rua do Comércio",
            number: "350",
            complement: "Bloco B",
            code: "03000-200",
          },
        },
        {
          id: `${++id}`,
          fullName: "Felipe Ramos",
          dateOfBirth: new Date("2004-09-18"),
          registrationNumber: "2023006",
          enrollmentDate: new Date("2022-12-10"),
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_3" as SchoolYear,
          address: {
            street: "Avenida Central",
            number: "1020",
            complement: "Sala 12",
            code: "04000-300",
          },
        },
        {
          id: `${++id}`,
          fullName: "Marina Costa",
          dateOfBirth: new Date("2010-06-25"),
          registrationNumber: "2023007",
          enrollmentDate: new Date("2023-06-01"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
          address: {
            street: "Rua do Sol",
            number: "77",
            complement: "Apartamento 7",
            code: "05000-400",
          },
        },
        {
          id: `${++id}`,
          fullName: "Gustavo Lima",
          dateOfBirth: new Date("2003-02-14"),
          registrationNumber: "2023008",
          enrollmentDate: new Date("2021-08-23"),
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_2" as SchoolYear,
          address: {
            street: "Praça da Matriz",
            number: "1",
            complement: "",
            code: "06000-500",
          },
        },
        {
          id: `${++id}`,
          fullName: "Renata Almeida",
          dateOfBirth: new Date("2005-12-30"),
          registrationNumber: "2023009",
          enrollmentDate: new Date("2023-01-20"),
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
          address: {
            street: "Rua das Acácias",
            number: "410",
            complement: "Casa",
            code: "07000-600",
          },
        },
        {
          id: `${++id}`,
          fullName: "Thiago Nunes",
          dateOfBirth: new Date("2002-01-09"),
          registrationNumber: "2023010",
          enrollmentDate: new Date("2020-03-11"),
          status: "INATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_2" as SchoolYear,
          address: {
            street: "Estrada Velha",
            number: "999",
            complement: "Sitio",
            code: "08000-700",
          },
        },
      ],
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
          id: `${++id}`,
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
          id: `${++id}`,
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
          id: `${++id}`,
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
