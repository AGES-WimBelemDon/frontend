import { api } from "./api";
import type { EducationLevel } from "./students";

export type Race = 
  | "BRANCA"
  | "PRETA"
  | "PARDA"
  | "AMARELA"
  | "INDIGENA"
  | "NA"
;

export type Gender = 
  | "MASCULINO"
  | "FEMININO"
  | "OUTRO"
;

export type SocialProgram = 
  | "BOLSA_FAMILIA"
  | "BPC_LOAS"
  | "TARIFA_SOCIAL_DE_ENERGIA"
  | "AUXILIO_GAS"
  | "PROGRAMA_ESTADUAL"
  | "PROGRAMA_MUNICIPAL_VIA_CRAS"
;

export type EmploymentStatus =
  | "EMPREGADO"
  | "DESEMPREGADO"
  | "ESTUDANTE"
  | "OUTRO"
;

export async function getRacesFilter(): Promise<Race[]> {
  try {
    const response = await api.get<Race[]>("/filtros/racas");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "BRANCA" as Race,
        "PRETA" as Race,
        "PARDA" as Race,
        "AMARELA" as Race,
        "INDIGENA" as Race,
        "NA" as Race,
      ],
    });
    return mockResponse.data;
  }
}

export async function getSocialProgramsFilter(): Promise<SocialProgram[]> {
  try {
    const response = await api.get<SocialProgram[]>("/filtros/programas-sociais");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "BOLSA_FAMILIA" as SocialProgram,
        "BPC_LOAS" as SocialProgram,
        "TARIFA_SOCIAL_DE_ENERGIA" as SocialProgram,
        "AUXILIO_GAS" as SocialProgram,
        "PROGRAMA_ESTADUAL" as SocialProgram,
        "PROGRAMA_MUNICIPAL_VIA_CRAS" as SocialProgram,
      ],
    });
    return mockResponse.data;
  }
}

export async function getGendersFilter(): Promise<Gender[]> {
  try {
    const response = await api.get<Gender[]>("/filtros/generos");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "MASCULINO" as Gender,
        "FEMININO" as Gender,
        "OUTRO" as Gender,
      ],
    });
    return mockResponse.data;
  }
}

export async function getEmploymentStatusFilter(): Promise<EmploymentStatus[]> {
  try {
    const response = await api.get<EmploymentStatus[]>("/filtros/situacoes-emprego");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "EMPREGADO" as EmploymentStatus,
        "DESEMPREGADO" as EmploymentStatus,
        "ESTUDANTE" as EmploymentStatus,
        "OUTRO" as EmploymentStatus,
      ],
    });
    return mockResponse.data;
  }
}

export async function getStudentEducationLevelFilter(): Promise<EducationLevel[]> {
  try {
    const response = await api.get<EducationLevel[]>("/filtros/educacao");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "NENHUM" as EducationLevel,
        "ALFABETIZADO" as EducationLevel,
        "FUNDAMENTAL_INCOMPLETO" as EducationLevel,
        "FUNDAMENTAL_COMPLETO" as EducationLevel,
        "ENSINO_MEDIO_INCOMPLETO" as EducationLevel,
        "ENSINO_MEDIO_COMPLETO" as EducationLevel,
        "SUPERIOR_INCOMPLETO" as EducationLevel,
        "SUPERIOR_COMPLETO" as EducationLevel,
        "POS_GRADUACAO" as EducationLevel,
      ],
    });
    return mockResponse.data;
  }
}
