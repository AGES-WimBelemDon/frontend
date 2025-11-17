import type { AxiosError } from "axios";

import { api, endpoints } from "./api";
import { strings } from "../constants";
import type { AddressResponse } from "../types/address";
import type { Id } from "../types/id";
import type { ApiStudent, Student, StudentResponsible } from "../types/students";


export async function registerStudent(student: Partial<Student>): Promise<Pick<ApiStudent, "id">> {
  try {
    const response = await api.post(endpoints.students.base, student);
    return response.data;
  } catch {
    throw new Error("Error on servicesRegisterStudent");
  }
}

export async function registerAddress(studentId: Id, address: Partial<AddressResponse>): Promise<Pick<AddressResponse, "id">> {
  try {
    const response = await api.post(endpoints.students.addressById(studentId), address);
    return response.data;
  } catch {
    throw new Error("Error on servicesRegisterAddress");
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
    throw new Error("Error on servicesAddStudentDocument");
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
    throw new Error("Error on servicesGetStudents");
  }
}

export async function getStudentResponsibles({ id: studentId }: Pick<ApiStudent, "id">): Promise<StudentResponsible[]> {
  try {
    const response = await api.get<StudentResponsible[]>(endpoints.familyMembers.byStudentId(studentId));
    return response.data;
  } catch {
    throw new Error("Error on servicesGetStudentResponsibles");
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