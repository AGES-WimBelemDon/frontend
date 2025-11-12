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
          id: String(++id),
          name: "Chamada Geral",
          teacher: "Professor Mestre",
          area: "Esportes",
          frequency: "Diária",
        },
        {
          id: String(++id),
          name: "Tênis",
          teacher: "Professor de Tênis",
          area: "Esportes",
          frequency: "Semanal",
        },
        {
          id: String(++id),
          name: "Hidroginástica",
          teacher: "Professor de Hidroginástica",
          area: "Aquáticos",
          frequency: "Mensal",
        },
        {
          id: String(++id),
          name: "Natação",
          teacher: "Professor de Natação",
          area: "Aquáticos",
          frequency: "Semanal",
        },
        {
          id: String(++id),
          name: "Musculação",
          teacher: "Professor de Musculação",
          area: "Academia",
          frequency: "Diária",
        },
        {
          id: String(++id),
          name: "Spinning",
          teacher: "Professor de Spinning",
          area: "Academia",
          frequency: "Semanal",
        },
        {
          id: String(++id),
          name: "Yoga",
          teacher: "Professor de Yoga",
          area: "Bem-estar",
          frequency: "Semanal",
        },
        {
          id: String(++id),
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
