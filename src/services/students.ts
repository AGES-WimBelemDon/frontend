import type { AddressResponse } from "./address";
import { api, endpoints } from "./api";
import type { EmploymentStatus, Gender, Race, SocialPrograms } from "./filters";


export type Student = {
  id: string;
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
  console.log("Registering student:", student);
  try {
    const response = await api.post(endpoints.students.base, student);
    console.log("Registered student response:", response.data);
    return response.data;
  } catch {
    throw new Error("Error registering student");
  }
}

export async function registerAddress(studentId: string, address: Partial<AddressResponse>): Promise<Pick<AddressResponse, "id">> {
  console.log("Registering address for student ID:", studentId, "with address data:", address);
  try {
    const response = await api.post(endpoints.students.address(studentId), address);
    return response.data;
  } catch {
    throw new Error("Error registering address");
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
          dateOfBirth: "2008-01-01",
          registrationNumber: "REG-001",
          enrollmentDate: "2020-02-01",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "João Pedro",
          dateOfBirth: "2009-03-04",
          registrationNumber: "REG-002",
          enrollmentDate: "2021-03-01",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Pedro Henrique",
          dateOfBirth: "2010-05-10",
          registrationNumber: "REG-003",
          enrollmentDate: "2022-04-01",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Thiago Camargo",
          dateOfBirth: "2007-07-21",
          registrationNumber: "REG-004",
          enrollmentDate: "2019-08-01",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_2" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Paulo Camargo",
          dateOfBirth: "2006-09-15",
          registrationNumber: "REG-005",
          enrollmentDate: "2018-02-01",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
        },
        {
          id: (++id).toString(),
          address: {} as AddressResponse,
          fullName: "Mayara Cardi",
          dateOfBirth: "2005-11-30",
          registrationNumber: "REG-006",
          enrollmentDate: "2017-03-01",
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
