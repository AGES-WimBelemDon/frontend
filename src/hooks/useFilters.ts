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
  getSchoolYearsFilter
} from "../services/filters";
import type { 
  Race, 
  Gender, 
  SocialPrograms, 
  EmploymentStatus,
  IdentityType,
  DocumentType,
  WeekDay,
  Level,
  CivilState
} from "../services/filters";
import type { EducationLevel, SchoolYear } from "../services/students";

export type FilterOption<T> = {
  id: T;
  label: string;
};

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
  EMPREGADO: "employed",
  DESEMPREGADO: "unemployed",
  ESTUDANTE: "student",
  OUTRO: "other",
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

const identityTypesFilterOptionsMap: Record<IdentityType, keyof typeof strings.filters.identityTypes> = {
  RG: "rg",
  CPF: "cpf",
  CERTIDAO_NASCIMENTO: "birthCertificate",
}

const documentTypesFilterOptionsMap: Record<DocumentType, keyof typeof strings.filters.documentTypes> = {
  COMPROVANTE_RESIDENCIA: "residenceProof",
  COMPROVANTE_RENDA: "incomeProof",
  OUTRO: "other",
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
}

const schoolYearFilterOptionsMap: Record<SchoolYear, keyof typeof strings.filters.schoolYear> = {
  EDUCACAO_INFANTIL: "infantileEducation",
  FUNDAMENTAL_1: "elementary1",
  FUNDAMENTAL_2: "elementary2",
  ENSINO_MEDIO_1: "highSchool1",
  ENSINO_MEDIO_2: "highSchool2",
  ENSINO_MEDIO_3: "highSchool3",
  EJA: "eja",
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

  const { data: educationLevels } = useQuery({
    queryKey: ["filters", "educationLevels"],
    queryFn: () => queryFunction(getStudentEducationLevelFilter, educationLevelFilterOptionsMap, "educationLevel"),
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

  const { data: weekDaysOptions } = useQuery({
    queryKey: ["filters", "weekDays"],
    queryFn: () => queryFunction(getWeekDaysFilter, weekDaysFilterOptionsMap, "weekDays"),
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

  const { data: schoolYearOptions } = useQuery({
    queryKey: ["filters", "schoolYears"],
    queryFn: () => queryFunction(getSchoolYearsFilter, schoolYearFilterOptionsMap, "schoolYear"),
    staleTime: Infinity
  })

  return {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    documentTypesOptions,
    socialProgramsOptions,
    employmentStatusOptions,
    weekDaysOptions,
    levelOptions,
    civilStateOptions,
    schoolYearOptions,
  };
}
