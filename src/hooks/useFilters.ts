import { useQuery } from "@tanstack/react-query";

import { strings } from "../constants";
import { 
  getEmploymentStatusFilter, 
  getGendersFilter, 
  getRacesFilter, 
  getSocialProgramsFilter, 
  getStudentEducationLevelFilter,
  getIdentityTypesFilter,
  getDocumentTypesFilter,
  getWeekDaysFilter,
  getLevelsFilter,
  getCivilStatesFilter,
  getSchoolYearsFilter,
  getFormTypesFilter,
  getUserStatusFilter,
  getStudentStatusFilter,
  getFrequencyStatusFilter,
  getClassStateFilter,
  getNoteTypesFilter,
  getRoleFilter
} from "../services/filters";
import type { CivilState, ClassState, DocumentType, EducationLevel, EmploymentStatus, FormType, FrequencyStatus, Gender, IdentityType, Level, NoteTypes, Race, Role, SchoolYear, SocialPrograms, StudentStatus, UserStatus, WeekDay } from "../types/filters";

export type FilterOption<T> = {
  id: T;
  label: string;
};

const formTypeFilterOptionsMap: Record<FormType, keyof typeof strings.filters.formType> = {
  PSICOLOGIA: "psychology",
  SOCIAL: "social",
}

const userStatusFilterOptionsMap: Record<UserStatus, keyof typeof strings.filters.userStatus> = {
  ATIVO: "active",
  INATIVO: "inactive",
}

const studentStatusFilterOptionsMap: Record<StudentStatus, keyof typeof strings.filters.studentStatus> = {
  ATIVO: "active",
  INATIVO: "inactive",
}

const frequencyStatusFilterOptionsMap: Record<FrequencyStatus, keyof typeof strings.filters.frequencyStatus> = {
  PRESENTE: "present",
  AUSENTE: "absent",
}

const classStateFilterOptionsMap: Record<ClassState, keyof typeof strings.filters.classState> = {
  ATIVA: "active",
  INATIVA: "inactive",
}

const raceFilterOptionsMap: Record<Race, keyof typeof strings.filters.race> = {
  BRANCA: "white",
  PRETA: "black",
  PARDA: "brown",
  AMARELA: "yellow",
  INDIGENA: "indigenous",
  NA: "notDeclared",
}

const genderFilterOptionsMap: Record<Gender, keyof typeof strings.filters.gender> = {
  MASCULINO: "male",
  FEMININO: "female",
  HOMEM_TRANS: "transMan",
  MULHER_TRANS: "transWoman",
  NAO_BINARIO: "nonBinary",
  OUTRO: "other",
}

const socialProgramOptionsMap: Record<SocialPrograms, keyof typeof strings.filters.socialPrograms> = {
  BOLSA_FAMILIA: "bolsaFamilia",
  BPC_LOAS: "bpcLoas",
  TARIFA_SOCIAL_DE_ENERGIA: "tarifaSocialDeEnergia",
  AUXILIO_GAS: "auxilioGas",
  PROGRAMA_ESTADUAL: "programaEstadual",
  PROGRAMA_MUNICIPAL_VIA_CRAS: "programaMunicipalViaCras",
}

const employmentStatusFilterOptionsMap: Record<EmploymentStatus, keyof typeof strings.filters.employmentStatus> = {
  ESTUDANTE: "student",
  EMPREGADO: "employed",
  DESEMPREGADO: "unemployed",
  ESTAGIARIO: "intern",
  APRENDIZ: "apprentice",
  AUTONOMO: "selfEmployed",
  OUTRO: "other",
}

const schoolYearFilterOptionsMap: Record<SchoolYear, keyof typeof strings.filters.schoolYear> = {
  EDUCACAO_INFANTIL: "infantileEducation",
  FUNDAMENTAL_1: "elementary1",
  FUNDAMENTAL_2: "elementary2",
  FUNDAMENTAL_3: "elementary3",
  FUNDAMENTAL_4: "elementary4",
  FUNDAMENTAL_5: "elementary5",
  FUNDAMENTAL_6: "elementary6",
  FUNDAMENTAL_7: "elementary7",
  FUNDAMENTAL_8: "elementary8",
  FUNDAMENTAL_9: "elementary9",
  ENSINO_MEDIO_1: "highSchool1",
  ENSINO_MEDIO_2: "highSchool2",
  ENSINO_MEDIO_3: "highSchool3",
  EJA: "eja",
}

const educationLevelFilterOptionsMap: Record<EducationLevel, keyof typeof strings.filters.educationLevel> = {
  NENHUM: "none",
  ALFABETIZADO: "literate",
  FUNDAMENTAL_INCOMPLETO: "incompleteElementary",
  FUNDAMENTAL_COMPLETO: "completeElementary",
  ENSINO_MEDIO_INCOMPLETO: "incompleteHighSchool",
  ENSINO_MEDIO_COMPLETO: "completeHighSchool",
  SUPERIOR_INCOMPLETO: "incompleteHigher",
  SUPERIOR_COMPLETO: "completeHigher",
  POS_GRADUACAO: "posGraduation",
}

const noteTypesFilterOptionsMap: Record<NoteTypes, keyof typeof strings.filters.noteTypes> = {
  ATESTADO_MEDICO: "medical",
  SEM_JUSTIFICATIVA: "none",
}

const weekDaysFilterOptionsMap: Record<WeekDay, keyof typeof strings.filters.weekDays> = {
  SEGUNDA: "monday",
  TERCA: "tuesday",
  QUARTA: "wednesday",
  QUINTA: "thursday",
  SEXTA: "friday",
  SABADO: "saturday",
  DOMINGO: "sunday",
}

const roleFilterOptionsMap: Record<Role, keyof typeof strings.filters.role> = {
  admin: "admin",
  manager: "manager",
  teacher: "teacher",
  psychologist: "psychologist",
  psychology_intern: "psychology_intern",
  social_worker: "social_worker",
  social_work_intern: "social_work_intern",
}

const identityTypesFilterOptionsMap: Record<IdentityType, keyof typeof strings.filters.identityTypes> = {
  CERTIDAO_NASCIMENTO: "birthCertificate",
  CPF: "cpf",
  RG: "rg",
  CNH: "driverLicense",
  PASSAPORTE: "passport",
  TITULO_ELEITOR: "voterRegistration",
  CTPS: "ctps",
  OUTRO: "other",
}

const documentTypesFilterOptionsMap: Record<DocumentType, keyof typeof strings.filters.documentTypes> = {
  COMPROVANTE_RESIDENCIA: "residenceProof",
  COMPROVANTE_RENDA: "incomeProof",
  OUTRO: "other",
}

const levelsFilterOptionsMap: Record<Level, keyof typeof strings.filters.levels> = {
  INICIANTE: "beginner",
  INTERMEDIARIO: "intermediate",
  AVANCADO: "advanced",
}

const civilStatesFilterOptionsMap: Record<CivilState, keyof typeof strings.filters.civilStates> = {
  SOLTEIRO: "single",
  CASADO: "married",
  DIVORCIADO: "divorced",
  VIUVO: "widowed",
  UNIAO_ESTAVEL: "stableUnion",
}

function filterOptionsMapper<
  T extends string,
  U extends keyof typeof strings.filters
>(
  values: T[],
  labelsMap: Record<T, keyof (typeof strings.filters)[U]>,
  section: U,
): FilterOption<T>[] {
  const mappedValues = values.map(value => {
    const key = labelsMap[value];
    const val = strings.filters[section][key] as string;
    return { id: value, label: val };
  });
  return mappedValues;
}

async function queryFunction<
  T extends string,
  U extends keyof typeof strings.filters
>(
  callback: () => Promise<T[]>,
  labelsMap: Record<T, keyof (typeof strings.filters)[U]>,
  section: U,
): Promise<FilterOption<T>[]> {
  const values = await callback();
  return filterOptionsMapper(values, labelsMap, section);
}

export function useFilters() {
  const { data: formTypeOptions } = useQuery({
    queryKey: ["filters", "formTypes"],
    queryFn: () => queryFunction(getFormTypesFilter, formTypeFilterOptionsMap, "formType"),
    staleTime: Infinity
  })

  const { data: userStatusOptions } = useQuery({
    queryKey: ["filters", "userStatus"],
    queryFn: () => queryFunction(getUserStatusFilter, userStatusFilterOptionsMap, "userStatus"),
    staleTime: Infinity
  })

  const { data: studentStatusOptions } = useQuery({
    queryKey: ["filters", "studentStatus"],
    queryFn: () => queryFunction(getStudentStatusFilter, studentStatusFilterOptionsMap, "studentStatus"),
    staleTime: Infinity
  })

  const { data: frequencyStatusOptions } = useQuery({
    queryKey: ["filters", "frequencyStatus"],
    queryFn: () => queryFunction(getFrequencyStatusFilter, frequencyStatusFilterOptionsMap, "frequencyStatus"),
    staleTime: Infinity
  })

  const { data: classStateOptions } = useQuery({
    queryKey: ["filters", "classState"],
    queryFn: () => queryFunction(getClassStateFilter, classStateFilterOptionsMap, "classState"),
    staleTime: Infinity
  })

  const { data: raceOptions } = useQuery({
    queryKey: ["filters", "races"],
    queryFn: () => queryFunction(getRacesFilter, raceFilterOptionsMap, "race"),
    staleTime: Infinity
  })

  const { data: genderOptions } = useQuery({
    queryKey: ["filters", "genders"],
    queryFn: () => queryFunction(getGendersFilter, genderFilterOptionsMap, "gender"),
    staleTime: Infinity
  })
  
  const { data: socialProgramsOptions } = useQuery({
    queryKey: ["filters", "socialPrograms"],
    queryFn: () => queryFunction(getSocialProgramsFilter, socialProgramOptionsMap, "socialPrograms"),
    staleTime: Infinity
  })

  const { data: employmentStatusOptions } = useQuery({
    queryKey: ["filters", "employmentStatus"],
    queryFn: () => queryFunction(getEmploymentStatusFilter, employmentStatusFilterOptionsMap, "employmentStatus"),
    staleTime: Infinity
  })

  const { data: schoolYearOptions } = useQuery({
    queryKey: ["filters", "schoolYears"],
    queryFn: () => queryFunction(getSchoolYearsFilter, schoolYearFilterOptionsMap, "schoolYear"),
    staleTime: Infinity
  })

  const { data: educationLevels } = useQuery({
    queryKey: ["filters", "educationLevels"],
    queryFn: () => queryFunction(getStudentEducationLevelFilter, educationLevelFilterOptionsMap, "educationLevel"),
    staleTime: Infinity
  })

  const { data: noteTypesOptions } = useQuery({
    queryKey: ["filters", "noteTypes"],
    queryFn: () => queryFunction(getNoteTypesFilter, noteTypesFilterOptionsMap, "noteTypes"),
    staleTime: Infinity
  })

  const { data: weekDaysOptions } = useQuery({
    queryKey: ["filters", "weekDays"],
    queryFn: () => queryFunction(getWeekDaysFilter, weekDaysFilterOptionsMap, "weekDays"),
    staleTime: Infinity
  })

  const { data: roleOptions } = useQuery({
    queryKey: ["filters", "roles"],
    queryFn: () => queryFunction(getRoleFilter, roleFilterOptionsMap, "role"),
    staleTime: Infinity
  })

  const { data: identityTypesOptions } = useQuery({
    queryKey: ["filters", "identityTypes"],
    queryFn: () => queryFunction(getIdentityTypesFilter, identityTypesFilterOptionsMap, "identityTypes"),
    staleTime: Infinity
  })

  const { data: documentTypesOptions } = useQuery({
    queryKey: ["filters", "documentTypes"],
    queryFn: () => queryFunction(getDocumentTypesFilter, documentTypesFilterOptionsMap, "documentTypes"),
    staleTime: Infinity
  })

  const { data: levelOptions } = useQuery({
    queryKey: ["filters", "levels"],
    queryFn: () => queryFunction(getLevelsFilter, levelsFilterOptionsMap, "levels"),
    staleTime: Infinity
  })

  const { data: civilStateOptions } = useQuery({
    queryKey: ["filters", "civilStates"],
    queryFn: () => queryFunction(getCivilStatesFilter, civilStatesFilterOptionsMap, "civilStates"),
    staleTime: Infinity
  })

  return {
    formTypeOptions,
    userStatusOptions,
    studentStatusOptions,
    frequencyStatusOptions,
    classStateOptions,
    raceOptions,
    genderOptions,
    socialProgramsOptions,
    employmentStatusOptions,
    schoolYearOptions,
    educationLevels,
    identityTypesOptions,
    documentTypesOptions,
    noteTypesOptions,
    weekDaysOptions,
    roleOptions,
    levelOptions,
    civilStateOptions
  }
}
