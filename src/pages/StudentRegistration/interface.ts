export type Document = {
  fileName: string;
  fileType: string;
  documentType: string;
  origin: string;
  date: string;
  description: string;
  id: number;
};

export type Address = {
  code: string;
  street: string;
  number: string;
  complement?: string;
}

export type StudentStatus = "Ativo" | "Inativo" | "Suspenso";

export type StudentLevel = "Fundamental" | "Médio" | "Superior" | "Outro";

export type Race = "Branca" | "Preta" | "Parda" | "Asiática" | "Indígena" | "Não Declarada";

export type SchoolYear = "Pré-Escola" | "1º Ano do Ensino Fundamental" | "2º Ano do Ensino Fundamental" | "3º Ano do Ensino Fundamental" | "4º Ano do Ensino Fundamental" | "5º Ano do Ensino Fundamental" | "6º Ano do Ensino Fundamental" | "7º Ano do Ensino Fundamental" | "8º Ano do Ensino Fundamental" | "9º Ano do Ensino Fundamental" | "1ª Série do Ensino Médio" | "2ª Série do Ensino Médio" | "3ª Série do Ensino Médio";

export type SocialProgram = "Bolsa Família" | "BPC/LOAS" | "Tarifa Social de Energia" | "Auxílio Gás" | "Programa Estadual" | "Programa Municipal via CRAS";

export type Gender = "Masculino" | "Feminino" | "Outro";

export type EmploymentStatus = "Empregado" | "Desempregado" | "Estudante" | "Outro";

export interface Student {
  address: Address;
  fullName: string;
  dateOfBirth: Date;
  registrationNumber: string;
  enrollmentDate: Date;
  disenrollmentDate?: Date;
  status: StudentStatus;
  level: StudentLevel;
  socialName?: string;
  race?: Race;
  schoolName?: string;
  schoolShift?: string;
  schoolYear?: SchoolYear;
  socialProgram?: SocialProgram;
  gender?: Gender;
  employmentStatus?: EmploymentStatus;
  gradeGap?: boolean;
}
