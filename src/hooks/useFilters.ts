import { useQuery } from "@tanstack/react-query";

import { pt } from "../constants";
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
  getCivilStatesFilter
} from "../services/filters";
import type { 
  Race, 
  Gender, 
  SocialProgram, 
  EmploymentStatus,
  IdentityType,
  DocumentType,
  WeekDay,
  Level,
  CivilState
} from "../services/filters";
import type { EducationLevel } from "../services/students";

export type FilterOption<T> = {
  id: T;
  label: string;
};

const raceFilterOptionsMap: Record<Race, keyof typeof pt.filters.race> = {
  BRANCA: "white",
  PRETA: "black",
  PARDA: "brown",
  AMARELA: "yellow",
  INDIGENA: "indigenous",
  NA: "notDeclared",
}

const genderFilterOptionsMap: Record<Gender, keyof typeof pt.filters.gender> = {
  MASCULINO: "male",
  FEMININO: "female",
  OUTRO: "other",
}

const socialProgramOptionsMap: Record<SocialProgram, keyof typeof pt.filters.socialPrograms> = {
  BOLSA_FAMILIA: "bolsaFamilia",
  BPC_LOAS: "bpcLoas",
  TARIFA_SOCIAL_DE_ENERGIA: "tarifaSocialDeEnergia",
  AUXILIO_GAS: "auxilioGas",
  PROGRAMA_ESTADUAL: "programaEstadual",
  PROGRAMA_MUNICIPAL_VIA_CRAS: "programaMunicipalViaCras",
}

const employmentStatusFilterOptionsMap: Record<EmploymentStatus, keyof typeof pt.filters.employmentStatus> = {
  EMPREGADO: "employed",
  DESEMPREGADO: "unemployed",
  ESTUDANTE: "student",
  OUTRO: "other",
}

const educationLevelFilterOptionsMap: Record<EducationLevel, keyof typeof pt.filters.educationLevel> = {
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

const identityTypesFilterOptionsMap: Record<IdentityType, keyof typeof pt.filters.identityTypes> = {
  RG: "rg",
  CPF: "cpf",
  CERTIDAO_NASCIMENTO: "birthCertificate",
}

const documentTypesFilterOptionsMap: Record<DocumentType, keyof typeof pt.filters.documentTypes> = {
  COMPROVANTE_RESIDENCIA: "residenceProof",
  COMPROVANTE_RENDA: "incomeProof",
  OUTRO: "other",
}

const weekDaysFilterOptionsMap: Record<WeekDay, keyof typeof pt.filters.weekDays> = {
  SEGUNDA: "monday",
  TERCA: "tuesday",
  QUARTA: "wednesday",
  QUINTA: "thursday",
  SEXTA: "friday",
  SABADO: "saturday",
  DOMINGO: "sunday",
}

const levelsFilterOptionsMap: Record<Level, keyof typeof pt.filters.levels> = {
  INICIANTE: "beginner",
  INTERMEDIARIO: "intermediate",
  AVANCADO: "advanced",
  TODOS_NIVEIS: "allLevels",
}

const civilStatesFilterOptionsMap: Record<CivilState, keyof typeof pt.filters.civilStates> = {
  SOLTEIRO: "single",
  CASADO: "married",
  DIVORCIADO: "divorced",
  VIUVO: "widowed",
}

function filterOptionsMapper<
  T extends string,
  U extends keyof typeof pt.filters
>(
  values: T[],
  labelsMap: Record<T, keyof (typeof pt.filters)[U]>,
  section: U,
): FilterOption<T>[] {
  const mappedValues = values.map(value => {
    const key = labelsMap[value];
    const val = pt.filters[section][key] as string;
    return { id: value, label: val };
  });
  return [{ id: "null" as T, label: "" }, ...mappedValues];
}

async function queryFunction<
  T extends string,
  U extends keyof typeof pt.filters
>(
  callback: () => Promise<T[]>,
  labelsMap: Record<T, keyof (typeof pt.filters)[U]>,
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
  
  const { data: socialProgramOptions } = useQuery({
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

  return {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    documentTypesOptions,
    socialProgramOptions,
    employmentStatusOptions,
    weekDaysOptions,
    levelOptions,
    civilStateOptions,
  };
}
