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
    throw new Error("Error on servicesGetFormTypesFilter")
  }
}

export async function getUserStatusFilter(): Promise<UserStatus[]> {
  try {
    const response = await api.get<UserStatus[]>(endpoints.filters.userStatus);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetUserStatusFilter")
  }
}

export async function getStudentStatusFilter(): Promise<StudentStatus[]> {
  try {
    const response = await api.get<StudentStatus[]>(endpoints.filters.studentStatus);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetStudentStatusFilter")
  }
}

export async function getFrequencyStatusFilter(): Promise<FrequencyStatus[]> {
  try {
    const response = await api.get<FrequencyStatus[]>(endpoints.filters.frequencyStatus);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetFrequencyStatusFilter")
  }
}

export async function getClassStateFilter(): Promise<ClassState[]> {
  try {
    const response = await api.get<ClassState[]>(endpoints.filters.classState);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetClassStateFilter")
  }
}

export async function getRacesFilter(): Promise<Race[]> {
  try {
    const response = await api.get<Race[]>(endpoints.filters.races);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetRacesFilter")
  }
}

export async function getGendersFilter(): Promise<Gender[]> {
  try {
    const response = await api.get<Gender[]>(endpoints.filters.genders);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetGendersFilter")
  }
}

export async function getSocialProgramsFilter(): Promise<SocialPrograms[]> {
  try {
    const response = await api.get<SocialPrograms[]>(endpoints.filters.socialPrograms);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetSocialProgramsFilter")
  }
}

export async function getEmploymentStatusFilter(): Promise<EmploymentStatus[]> {
  try {
    const response = await api.get<EmploymentStatus[]>(endpoints.filters.employmentStatus);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetEmploymentStatusFilter")
  }
}

export async function getSchoolYearsFilter(): Promise<SchoolYear[]> {
  try {
    const response = await api.get<SchoolYear[]>(endpoints.filters.schoolYears);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetSchoolYearsFilter")
  }
}

export async function getStudentEducationLevelFilter(): Promise<EducationLevel[]> {
  try {
    const response = await api.get<EducationLevel[]>(endpoints.filters.educationLevels);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetStudentEducationLevelFilter")
  }
}

export async function getNoteTypesFilter(): Promise<NoteTypes[]> {
  try {
    const response = await api.get<NoteTypes[]>(endpoints.filters.noteTypes);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetNoteTypesFilter")
  }
}

export async function getWeekDaysFilter(): Promise<WeekDay[]> {
  try {
    const response = await api.get<WeekDay[]>(endpoints.filters.weekDays);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetWeekDaysFilter")
  }
}

export async function getRoleFilter(): Promise<Role[]> {
  try {
    const response = await api.get<Role[]>(endpoints.filters.roles);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetRoleFilter")
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
