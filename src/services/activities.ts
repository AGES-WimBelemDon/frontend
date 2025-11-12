import { api, endpoints } from "./api";

export type Activity = {
  id: number;
  name: string;
  teacher: string;
  area: string;
  frequency: string;
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>(endpoints.activities);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
          name: "Chamada Geral",
          teacher: "Professor Mestre",
          area: "Esportes",
          frequency: "Diária",
        },
        {
          id: ++id,
          name: "Tênis",
          teacher: "Professor de Tênis",
          area: "Esportes",
          frequency: "Semanal",
        },
        {
          id: ++id,
          name: "Hidroginástica",
          teacher: "Professor de Hidroginástica",
          area: "Aquáticos",
          frequency: "Mensal",
        },
        {
          id: ++id,
          name: "Natação",
          teacher: "Professor de Natação",
          area: "Aquáticos",
          frequency: "Semanal",
        },
        {
          id: ++id,
          name: "Musculação",
          teacher: "Professor de Musculação",
          area: "Academia",
          frequency: "Diária",
        },
        {
          id: ++id,
          name: "Spinning",
          teacher: "Professor de Spinning",
          area: "Academia",
          frequency: "Semanal",
        },
        {
          id: ++id,
          name: "Yoga",
          teacher: "Professor de Yoga",
          area: "Bem-estar",
          frequency: "Semanal",
        },
        {
          id: ++id,
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
