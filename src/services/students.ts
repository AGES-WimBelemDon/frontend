import { api, endpoints } from "./api";
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
