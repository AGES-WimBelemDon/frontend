import type { Address, AddressResponse } from "./address";
import { api, endpoints } from "./api";
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

export type StudentResponsible = {
  id: string;
  fullName: string;
  socialName?: string;
  registrationNumber: string;
  dateOfBirth: string;
  nis?: string;
  phoneNumber: string;
  email?: string;
  address: string;
  relationship: string;
  race?: string;
  gender?: string;
  educationLevel?: string;
  socialPrograms?: string;
  employmentStatus?: string;
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

export async function getStudents(): Promise<StudentRecord[]> {
  try {
    const response = await api.get<StudentRecord[]>(endpoints.students);
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

export async function getStudentResponsibles({ id: studentId }: Pick<ApiStudent, "id">): Promise<StudentResponsible[]> {
  try {
    const response = await api.get<StudentResponsible[]>(endpoints.familyMembers.byStudent(studentId));
    
    const responsiblesWithAddress = await Promise.all(
      response.data.map(async (responsible) => {
        const addressResponse = await api.get<AddressResponse>(
          endpoints.familyMembers.address(responsible.id)
        );
        const formattedAddress = `${addressResponse.data.street}, ${addressResponse.data.neighborhood} - ${addressResponse.data.city}/${addressResponse.data.state} - CEP: ${addressResponse.data.cep}`;
        
        return {
          ...responsible,
          address: formattedAddress
        };
      })
    );

    return responsiblesWithAddress;
  } catch {
    throw new Error("erro")
  }
}
