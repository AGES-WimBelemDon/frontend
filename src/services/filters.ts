import { api, endpoints } from "./api";
import type {
  CivilState,
  ClassState,
  DocumentType,
  EducationLevel,
  EmploymentStatus,
  FormType,
  FrequencyStatus,
  Gender,
  IdentityType,
  Level,
  NoteTypes,
  Race,
  Role,
  SchoolYear,
  SocialPrograms,
  StudentStatus,
  UserStatus,
  WeekDay,
} from "../types/filters";


export async function getFormTypesFilter(): Promise<FormType[]> {
  try {
    const response = await api.get<FormType[]>(endpoints.filters.formTypes);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "PSICOLOGIA" as FormType,
        "SOCIAL" as FormType,
      ],
    });
    return mockResponse.data;
  }
}

export async function getUserStatusFilter(): Promise<UserStatus[]> {
  try {
    const response = await api.get<UserStatus[]>(endpoints.filters.userStatus);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ATIVO" as UserStatus,
        "INATIVO" as UserStatus,
      ],
    });
    return mockResponse.data;
  }
}

export async function getStudentStatusFilter(): Promise<StudentStatus[]> {
  try {
    const response = await api.get<StudentStatus[]>(endpoints.filters.studentStatus);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ATIVO" as StudentStatus,
        "INATIVO" as StudentStatus,
      ],
    });
    return mockResponse.data;
  }
}

export async function getFrequencyStatusFilter(): Promise<FrequencyStatus[]> {
  try {
    const response = await api.get<FrequencyStatus[]>(endpoints.filters.frequencyStatus);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "PRESENTE" as FrequencyStatus,
        "AUSENTE" as FrequencyStatus,
      ],
    });
    return mockResponse.data;
  }
}

export async function getClassStateFilter(): Promise<ClassState[]> {
  try {
    const response = await api.get<ClassState[]>(endpoints.filters.classState);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ATIVA" as ClassState,
        "INATIVA" as ClassState,
      ],
    });
    return mockResponse.data;
  }
}

export async function getRacesFilter(): Promise<Race[]> {
  try {
    const response = await api.get<Race[]>(endpoints.filters.races);
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

export async function getGendersFilter(): Promise<Gender[]> {
  try {
    const response = await api.get<Gender[]>(endpoints.filters.genders);
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

export async function getEmploymentStatusFilter(): Promise<EmploymentStatus[]> {
  try {
    const response = await api.get<EmploymentStatus[]>(endpoints.filters.employmentStatus);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ESTUDANTE" as EmploymentStatus,
        "EMPREGADO" as EmploymentStatus,
        "DESEMPREGADO" as EmploymentStatus,
        "ESTAGIARIO" as EmploymentStatus,
        "APRENDIZ" as EmploymentStatus,
        "AUTONOMO" as EmploymentStatus,
        "OUTRO" as EmploymentStatus,
      ],
    });
    return mockResponse.data;
  }
}

export async function getSchoolYearsFilter(): Promise<SchoolYear[]> {
  try {
    const response = await api.get<SchoolYear[]>(endpoints.filters.schoolYears);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "EDUCACAO_INFANTIL" as SchoolYear,
        "FUNDAMENTAL_1" as SchoolYear,
        "FUNDAMENTAL_2" as SchoolYear,
        "FUNDAMENTAL_3" as SchoolYear,
        "FUNDAMENTAL_4" as SchoolYear,
        "FUNDAMENTAL_5" as SchoolYear,
        "FUNDAMENTAL_6" as SchoolYear,
        "FUNDAMENTAL_7" as SchoolYear,
        "FUNDAMENTAL_8" as SchoolYear,
        "FUNDAMENTAL_9" as SchoolYear,
        "ENSINO_MEDIO_1" as SchoolYear,
        "ENSINO_MEDIO_2" as SchoolYear,
        "ENSINO_MEDIO_3" as SchoolYear,
        "EJA" as SchoolYear,
      ],
    });
    return mockResponse.data;
  }
}

export async function getStudentEducationLevelFilter(): Promise<EducationLevel[]> {
  try {
    const response = await api.get<EducationLevel[]>(endpoints.filters.educationLevels);
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

export async function getNoteTypesFilter(): Promise<NoteTypes[]> {
  try {
    const response = await api.get<NoteTypes[]>(endpoints.filters.noteTypes);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ATESTADO_MEDICO" as NoteTypes,
        "SEM_JUSTIFICATIVA" as NoteTypes,
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

export async function getRoleFilter(): Promise<Role[]> {
  try {
    const response = await api.get<Role[]>(endpoints.filters.roles);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    const mockResponse = await Promise.resolve({
      data: [
        "ADMIN" as Role,
        "MANAGER" as Role,
        "TEACHER" as Role,
        "PSYCHOLOGIST" as Role,
        "INTERN" as Role,
      ],
    });
    return mockResponse.data;
  }
}

export async function getIdentityTypesFilter(): Promise<IdentityType[]> {
  return [
    "CERTIDAO_NASCIMENTO",
    "CPF",
    "RG",
    "CNH",
    "PASSAPORTE",
    "TITULO_ELEITOR",
    "CTPS",
    "OUTRO",
  ] as IdentityType[];
}

export async function getDocumentTypesFilter(): Promise<DocumentType[]> {
  return [
    "COMPROVANTE_RESIDENCIA",
    "COMPROVANTE_RENDA",
    "OUTRO",
  ] as DocumentType[];
}

export async function getLevelsFilter(): Promise<Level[]> {
  try {
    const response = await api.get<Level[]>(endpoints.levels.base);
    console.log(response.data)
    return response.data;
  } catch {
    throw new Error("Error on servicesGetLevelsFilter")
  }
}

export async function getCivilStatesFilter(): Promise<CivilState[]> {
  return [
    "SOLTEIRO",
    "CASADO",
    "DIVORCIADO",
    "VIUVO",
    "UNIAO_ESTAVEL",
  ] as CivilState[];
}
