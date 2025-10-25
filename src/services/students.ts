import type { AddressResponse } from "./address";
import { api, endpoints } from "./api";
import type { EmploymentStatus, Gender, Race, SocialProgram } from "./filters";


export type Student = {
  id: string;
  address: AddressResponse;
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
    const response = await api.post(endpoints.students.base, student);
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
    const response = await api.get<Student[]>(endpoints.students.base);
    console.log("Fetched students:", response.data);
    const studentsWithAddress = await Promise.all(
      response.data.map(async (student) => {
        try {
          const addressResponse = await api.get<AddressResponse>(endpoints.students.address(student.id));
          return { ...student, address: addressResponse.data };
        } catch {
          console.error(`Error fetching address for student ID ${student.id}`);
          return { ...student, address: student.address ?? ({} as AddressResponse) };
        }
      })
    );
    console.log("Students with addresses:", studentsWithAddress);
    return studentsWithAddress;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Leonardo Mallet",
          dateOfBirth: new Date("2008-01-01"),
          registrationNumber: "REG-001",
          enrollmentDate: new Date("2020-02-01"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "João Pedro",
          dateOfBirth: new Date("2009-03-04"),
          registrationNumber: "REG-002",
          enrollmentDate: new Date("2021-03-01"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Pedro Henrique",
          dateOfBirth: new Date("2010-05-10"),
          registrationNumber: "REG-003",
          enrollmentDate: new Date("2022-04-01"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Thiago Camargo",
          dateOfBirth: new Date("2007-07-21"),
          registrationNumber: "REG-004",
          enrollmentDate: new Date("2019-08-01"),
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_2" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Paulo Camargo",
          dateOfBirth: new Date("2006-09-15"),
          registrationNumber: "REG-005",
          enrollmentDate: new Date("2018-02-01"),
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Mayara Cardi",
          dateOfBirth: new Date("2005-11-30"),
          registrationNumber: "REG-006",
          enrollmentDate: new Date("2017-03-01"),
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
        },
      ],
    });
    return mockResponse.data as Student[];
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
          id: (++id).toString(),
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
          id: (++id).toString(),
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
          id: (++id).toString(),
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
