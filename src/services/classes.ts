import { api, endpoints } from "./api";
import type { ApiClass, Classes, CreateClass, StudentFrequencyClass } from "../types/classes";
import type { Id } from "../types/id";


export async function createClasses(data: CreateClass): Promise<ApiClass["id"] | null> {
  try {
    const response = await api.post(endpoints.classes.base, data)
    return response.data.id;
  } catch {
    throw new Error("Error on servicesCreateClasses")
  }
}

export async function getClasses(): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>(endpoints.classes.base);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetClasses")
  }
}

export async function getClassFrequency({ id, date }: { id: Id; date: string }): Promise<StudentFrequencyClass> {
  try {
    const classFrequencyPrefix = endpoints.frequencies.specific;
    const classFrequencyQuery = new URLSearchParams({ classId: id.toString(), date });
    const classFrequencyEndpoint = `${classFrequencyPrefix}?${classFrequencyQuery.toString()}`;
    const response = await api.get<StudentFrequencyClass>(classFrequencyEndpoint);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetClassFrequency")
  }
}

export async function patchClass(id: Id, classData: Classes): Promise<number> {
  try {
    console.log(id)
    const response = await api.patch<Classes>(endpoints.classes.byId(id), classData)
    return response.status;
  } catch {
    throw new Error("Error on servicesPatchClass")
  }
}