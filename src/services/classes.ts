import { api, endpoints } from "./api";
import type { ApiClass, Classes, CreateClasses, StudentFrequencyClass } from "../types/classes";
import type { Id } from "../types/id";

export async function createClasses(data: CreateClasses): Promise<number> {
  try {
    const response = await api.post(endpoints.classes.base, data)
    return response.status;
  } catch {
    throw new Error("Error on servicesCreateClasses")
  }
}

export async function getClasses(): Promise<Classes[]> {
  try {
    const response = await api.get<Classes[]>(endpoints.classes.base);
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

export async function patchClass({ id }: { id: number }) {
  try {
    const response = await api.patch<Classes>(endpoints.classes.byId(id))
    return response.status;
  } catch {
    throw new Error("Error on servicesPatchClass")
  }
}

export async function getClassesByActivity(activityId: number): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>(endpoints.classes.base, {
      params: {
        activityId,
        state: "ALL", 
      },
    });

    return response.data;

  } catch {
    throw new Error("Error on servicesGetClassesByActivity")
  }
}
