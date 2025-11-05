import { api, endpoints } from "./api";
import type { EducationLevel, SchoolYear } from "./students";

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

export type SocialPrograms = 
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

export type IdentityType =
  | "RG"
  | "CPF"
  | "CERTIDAO_NASCIMENTO"
;

export type DocumentType =
  | "COMPROVANTE_RESIDENCIA"
  | "COMPROVANTE_RENDA"
  | "OUTRO"
;

export type WeekDay =
  | "SEGUNDA"
  | "TERCA"
  | "QUARTA"
  | "QUINTA"
  | "SEXTA"
  | "SABADO"
  | "DOMINGO"
;

export type Level =
  | "INICIANTE"
  | "INTERMEDIARIO"
  | "AVANCADO"
;

export type CivilState =
  | "SOLTEIRO"
  | "CASADO"
  | "DIVORCIADO"
  | "VIUVO"
;

export async function getRacesFilter(): Promise<Race[]> {
  try {
    const response = await api.get<Race[]>(endpoints.filters.race);
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

export async function getSocialProgramsFilter(): Promise<SocialPrograms[]> {
  try {
    const response = await api.get<SocialPrograms[]>(endpoints.filters.socialPrograms);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "BOLSA_FAMILIA" as SocialPrograms,
        "BPC_LOAS" as SocialPrograms,
        "TARIFA_SOCIAL_DE_ENERGIA" as SocialPrograms,
        "AUXILIO_GAS" as SocialPrograms,
        "PROGRAMA_ESTADUAL" as SocialPrograms,
        "PROGRAMA_MUNICIPAL_VIA_CRAS" as SocialPrograms,
      ],
    });
    return mockResponse.data;
  }
}

export async function getGendersFilter(): Promise<Gender[]> {
  try {
    const response = await api.get<Gender[]>(endpoints.filters.gender);
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
    const response = await api.get<EmploymentStatus[]>(endpoints.filters.employmentStatus);
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
    const response = await api.get<EducationLevel[]>(endpoints.filters.educationLevel);
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

export async function getIdentityTypesFilter(): Promise<IdentityType[]> {
  try {
    const response = await api.get<IdentityType[]>(endpoints.filters.identityTypes);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "RG" as IdentityType,
        "CPF" as IdentityType,
        "CERTIDAO_NASCIMENTO" as IdentityType,
      ],
    });
    return mockResponse.data;
  }
}

export async function getDocumentTypesFilter(): Promise<DocumentType[]> {
  try {
    const response = await api.get<DocumentType[]>(endpoints.filters.documentTypes);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "COMPROVANTE_RESIDENCIA" as DocumentType,
        "COMPROVANTE_RENDA" as DocumentType,
        "OUTRO" as DocumentType,
      ],
    });
    return mockResponse.data;
  }
}

export async function getWeekDaysFilter(): Promise<WeekDay[]> {
  try {
    const response = await api.get<WeekDay[]>(endpoints.filters.weekDays);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "SEGUNDA" as WeekDay,
        "TERCA" as WeekDay,
        "QUARTA" as WeekDay,
        "QUINTA" as WeekDay,
        "SEXTA" as WeekDay,
        "SABADO" as WeekDay,
        "DOMINGO" as WeekDay,
      ],
    });
    return mockResponse.data;
  }
}

export async function getLevelsFilter(): Promise<Level[]> {
  try {
    const response = await api.get<Level[]>(endpoints.filters.levels);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "INICIANTE" as Level,
        "INTERMEDIARIO" as Level,
        "AVANCADO" as Level,
        "TODOS_NIVEIS" as Level,
      ],
    });
    return mockResponse.data;
  }
}

export async function getCivilStatesFilter(): Promise<CivilState[]> {
  try {
    const response = await api.get<CivilState[]>(endpoints.filters.civilStates);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "SOLTEIRO" as CivilState,
        "CASADO" as CivilState,
        "DIVORCIADO" as CivilState,
        "VIUVO" as CivilState,
      ],
    });
    return mockResponse.data;
  }
}

export async function getSchoolYearsFilter(): Promise<SchoolYear[]> {
  try {
    const response = await api.get<SchoolYear[]>(endpoints.filters.schoolYear);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "EDUCACAO_INFANTIL" as SchoolYear,
        "FUNDAMENTAL_1" as SchoolYear,
        "FUNDAMENTAL_2" as SchoolYear,
        "ENSINO_MEDIO_1" as SchoolYear,
        "ENSINO_MEDIO_2" as SchoolYear,
        "ENSINO_MEDIO_3" as SchoolYear,
        "EJA" as SchoolYear,
      ],
    });
    return mockResponse.data;
  }
}
