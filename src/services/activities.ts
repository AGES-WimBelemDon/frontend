import { api } from "./api";

export type Activity = {
  id: string;
  name: string;
  teacher: string;
  area: string;
  frequency: string;
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>("/atividades");
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
      ],
    });
    return mockResponse.data;
  }
}
