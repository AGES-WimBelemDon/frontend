import { useQuery } from "@tanstack/react-query";

import { pt } from "../constants";
import { getEmploymentStatusFilter, getGendersFilter, getRacesFilter, getSocialProgramsFilter, getStudentEducationLevelFilter } from "../services/filters";
import type { Race, Gender, SocialProgram, EmploymentStatus } from "../services/filters";
import type { EducationLevel } from "../services/students";

type FilterOption<T> = {
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
  })

  const { data: genderOptions } = useQuery({
    queryKey: ["filters", "genders"],
    queryFn: () => queryFunction(getGendersFilter, genderFilterOptionsMap, "gender"),
  })
  
  const { data: socialProgramOptions } = useQuery({
    queryKey: ["filters", "socialPrograms"],
    queryFn: () => queryFunction(getSocialProgramsFilter, socialProgramOptionsMap, "socialPrograms"),
  })

  const { data: employmentStatusOptions } = useQuery({
    queryKey: ["filters", "employmentStatus"],
    queryFn: () => queryFunction(getEmploymentStatusFilter, employmentStatusFilterOptionsMap, "employmentStatus"),
  })

  const { data: educationLevels } = useQuery({
    queryKey: ["filters", "educationLevels"],
    queryFn: () => queryFunction(getStudentEducationLevelFilter, educationLevelFilterOptionsMap, "educationLevel"),
  })

  const identityTypesOptions = [
    "RG",
    "CPF",
    "Certidão de Nascimento",
  ];

  const documentTypesOptions = [
    "Comprovante de Residência",
    "Comprovante de Renda",
    "Outro",
  ];

  return {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    documentTypesOptions,
    socialProgramOptions,
    employmentStatusOptions,
  };
}
