import { api, endpoints } from "./api";
import type { Activity } from "../types/activities";

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>(endpoints.activities.base);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          name: "Chamada Geral",
          teacher: "Professor Mestre",
          area: "Esportes",
          frequency: "Diária",
        },
        {
          id: (++id).toString(),
          name: "Tênis",
          teacher: "Professor de Tênis",
          area: "Esportes",
          frequency: "Semanal",
        },
        {
          id: (++id).toString(),
          name: "Hidroginástica",
          teacher: "Professor de Hidroginástica",
          area: "Aquáticos",
          frequency: "Mensal",
        },
        {
          id: (++id).toString(),
          name: "Natação",
          teacher: "Professor de Natação",
          area: "Aquáticos",
          frequency: "Semanal",
        },
        {
          id: (++id).toString(),
          name: "Musculação",
          teacher: "Professor de Musculação",
          area: "Academia",
          frequency: "Diária",
        },
        {
          id: (++id).toString(),
          name: "Spinning",
          teacher: "Professor de Spinning",
          area: "Academia",
          frequency: "Semanal",
        },
        {
          id: (++id).toString(),
          name: "Yoga",
          teacher: "Professor de Yoga",
          area: "Bem-estar",
          frequency: "Semanal",
        },
        {
          id: (++id).toString(),
          name: "Programação",
          teacher: "Professor de Programação",
          area: "Tecnologia",
          frequency: "Semanal",
        },
      ],
    });
    return mockResponse.data;
  }
}

export async function updateActivity(
  id: string,
  payload: { name: string }
): Promise<Activity> {
  const response = await api.patch<Activity>(
    endpoints.activities.patch(id),
    payload
  );
  return response.data;
}

export async function createActivity(activity: Omit<Activity, "id">): Promise<Activity> {
  const response = await api.post<Activity>(endpoints.activities.base, activity);
  return response.data;
}
