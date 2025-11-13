import type { AxiosError } from "axios";

import { api, endpoints } from "./api";
import { strings } from "../constants";
import type { AddressResponse } from "../types/address";
import type { SchoolYear, StudentStatus } from "../types/filters";
import type { ApiStudent, Student, StudentResponsible } from "../types/students";


export async function registerStudent(student: Partial<Student>): Promise<Pick<ApiStudent, "id">> {
  try {
    const response = await api.post(endpoints.students.base, student);
    return response.data;
  } catch {
    throw new Error("Error registering student");
  }
}

export async function registerAddress(studentId: number, address: Partial<AddressResponse>): Promise<Pick<AddressResponse, "id">> {
  try {
    const response = await api.post(endpoints.students.addressById(studentId), address);
    return response.data;
  } catch {
    throw new Error("Error registering address");
  }
}

export async function addStudentDocument<Doc>(studentId: Pick<ApiStudent, "id">, document: Doc): Promise<void> {
  try {
    // TODO: Replace with actual endpoint when available
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
    const studentsWithAddress = await Promise.all(
      response.data.map(async (student) => {
        try {
          const addressResponse = await api.get<AddressResponse>(endpoints.students.addressById(student.id));
          return { ...student, address: addressResponse.data };
        } catch {
          console.error(`Error fetching address for student ID ${student.id}`);
          return { ...student, address: student.address ?? ({} as AddressResponse) };
        }
      })
    );
    return studentsWithAddress;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
          fullName: "João Pedro",
          dateOfBirth: "2006-07-20",
          registrationNumber: "2023002",
          enrollmentDate: "2023-02-01",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_2" as SchoolYear,
          address: {
            id: "1",
            cep: "01400-000",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Jardim Paulista",
            street: "Avenida Brasil",
            number: "456",
            complement: "",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Pedro Henrique",
          dateOfBirth: "2007-01-05",
          registrationNumber: "2023003",
          enrollmentDate: "2023-03-10",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
          address: {
            id: "2",
            cep: "01300-000",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Consolação",
            street: "Rua Augusta",
            number: "789",
            complement: "Casa 2",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Ana Beatriz",
          dateOfBirth: "2008-04-12",
          registrationNumber: "2023004",
          enrollmentDate: "2023-04-05",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_2" as SchoolYear,
          address: {
            id: "3",
            cep: "02000-100",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Tatuapé",
            street: "Travessa das Laranjeiras",
            number: "21",
            complement: "Casa",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Carla Souza",
          dateOfBirth: "2009-11-02",
          registrationNumber: "2023005",
          enrollmentDate: "2023-05-20",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
          address: {
            id: "4",
            cep: "03000-200",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Brás",
            street: "Rua do Comércio",
            number: "350",
            complement: "Bloco B",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Felipe Ramos",
          dateOfBirth: "2004-09-18",
          registrationNumber: "2023006",
          enrollmentDate: "2022-12-10",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_3" as SchoolYear,
          address: {
            id: "5",
            cep: "04000-300",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Itaim Bibi",
            street: "Avenida Central",
            number: "1020",
            complement: "Sala 12",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Marina Costa",
          dateOfBirth: "2010-06-25",
          registrationNumber: "2023007",
          enrollmentDate: "2023-06-01",
          status: "ATIVO" as StudentStatus,
          level: "FUNDAMENTAL_1" as SchoolYear,
          address: {
            id: "6",
            cep: "05000-400",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Vila Nova",
            street: "Rua do Sol",
            number: "77",
            complement: "Apartamento 7",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Gustavo Lima",
          dateOfBirth: "2003-02-14",
          registrationNumber: "2023008",
          enrollmentDate: "2021-08-23",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_2" as SchoolYear,
          address: {
            id: "7",
            cep: "06000-500",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Centro",
            street: "Praça da Matriz",
            number: "1",
            complement: "",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Renata Almeida",
          dateOfBirth: "2005-12-30",
          registrationNumber: "2023009",
          enrollmentDate: "2023-01-20",
          status: "ATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_1" as SchoolYear,
          address: {
            id: "8",
            cep: "07000-600",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Jardim das Flores",
            street: "Rua das Acácias",
            number: "410",
            complement: "Casa",
          } as AddressResponse,
        },
        {
          id: ++id,
          fullName: "Thiago Nunes",
          dateOfBirth: "2002-01-09",
          registrationNumber: "2023010",
          enrollmentDate: "2020-03-11",
          status: "INATIVO" as StudentStatus,
          level: "ENSINO_MEDIO_2" as SchoolYear,
          address: {
            id: "9",
            cep: "08000-700",
            city: "São Paulo",
            state: "SP",
            neighborhood: "Zona Rural",
            street: "Estrada Velha",
            number: "999",
            complement: "Sitio",
          } as AddressResponse,
        },
      ],
    });
    return mockResponse.data as Student[];
  }
}

export async function getStudentResponsibles({ id: studentId }: Pick<ApiStudent, "id">): Promise<StudentResponsible[]> {
  try {
    const response = await api.get<StudentResponsible[]>(endpoints.familyMembers.byStudentId(studentId));
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
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
          id: ++id,
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
          id: ++id,
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

export async function updateStudent(studentId: number, data: Partial<Student>): Promise<void> {
  try {
    await api.patch(endpoints.students.byId(studentId), data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    if (status === 404) throw new Error(strings.studentRegistration.errors.studentNotFound);
    if (status === 409) throw new Error(strings.studentRegistration.errors.invalidData);
    throw new Error(strings.studentRegistration.errors.internalError);
  }
}

export async function updateStudentAddress(addressId: number, data: Partial<AddressResponse>): Promise<void> {
  try {
    await api.patch(endpoints.address(addressId), data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    if (status === 404) throw new Error(strings.studentRegistration.errors.studentNotFound);
    if (status === 409) throw new Error(strings.studentRegistration.errors.invalidData);
    throw new Error(strings.studentRegistration.errors.internalError);
  }
}

export async function deactivateStudent(studentId: number): Promise<void> {
  try {
    await api.delete(endpoints.students.byId(studentId));
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    if (status === 404) throw new Error(strings.studentRegistration.errors.studentNotFound);
    throw new Error(strings.studentRegistration.errors.internalError);
  }
}

export async function activateStudent(studentId: number, activate: Partial<Student>): Promise<void> {
  try {
    await api.patch(`${endpoints.students.byId(studentId)}`, activate);
  }
  catch (error: unknown) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    if (status === 404) throw new Error(strings.studentRegistration.errors.studentNotFound);
    throw new Error(strings.studentRegistration.errors.internalError);
  }
}

export async function getStudentById(studentId: number): Promise<Student> {
  try {
    const response = await api.get<Student>(endpoints.students.byId(studentId));
    return response.data;
  } catch {
    throw new Error(strings.studentRegistration.errors.searchStudentError);
  }
}

export async function getStudentAddress(studentId: number): Promise<AddressResponse | null> {
  try {
    const response = await api.get<AddressResponse>(endpoints.students.addressById(studentId));
    return response.data;
  } catch {
    return null;
  }
}