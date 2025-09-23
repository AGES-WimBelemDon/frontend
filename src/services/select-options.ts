import { api } from "./api";

export type SelectId = "age-range" | "civil-state";

export interface Option {
  value: string;
  label: string;
}

export async function getOptionsForAgeRange() {
  try {
    const response = await api.get<Option[]>("/options/age-range");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    // This is a mock request only for tech demo purposes, this endpoint does not exist
    return [
      { value: "lt18", label: "Menor de 18" },
      { value: "18-60", label: "Entre 18 e 60" },
      { value: "gt60", label: "Maior de 60" },
    ] as Option[];
  }
}

export async function getOptionsForCivilState() {
  try {
    const response = await api.get<Option[]>("/options/civil-state");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    return [
      { value: "single", label: "Solteiro(a)" },
      { value: "married", label: "Casado(a)" },
      { value: "divorced", label: "Divorciado(a)" },
      { value: "widowed", label: "Viúvo(a)" },
      { value: "separated", label: "Separado(a)" },
    ] as Option[];
  }
}
