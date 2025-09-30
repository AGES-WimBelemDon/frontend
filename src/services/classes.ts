import { api } from "./api";

type ApiClass = {
  id: string;
  title: string;
  weekDay: string;
  schedule: string;
  level: string;
  activityId: string;
};

export async function getClasses(): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>("/turmas");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          title: "Yoga para Iniciantes",
          weekDay: "Segunda-feira",
          schedule: "08:00 - 09:00",
          level: "Iniciante",
          activityId: "7",
        },
        {
          id: (++id).toString(),
          title: "Yoga Intermediário",
          weekDay: "Segunda-feira",
          schedule: "09:00 - 10:00",
          level: "Intermediário",
          activityId: "7",
        },
        {
          id: (++id).toString(),
          title: "Bate-papo semanal",
          weekDay: "Quarta-feira",
          schedule: "19:00 - 20:00",
          level: "Todos os níveis",
          activityId: "1",
        },
        {
          id: (++id).toString(),
          title: "Tênis para Iniciantes",
          weekDay: "Terça-feira",
          schedule: "18:30 - 19:30",
          level: "Intermediário",
          activityId: "2",
        },
        {
          id: (++id).toString(),
          title: "Tênis Avançado",
          weekDay: "Quinta-feira",
          schedule: "07:00 - 08:00",
          level: "Avançado",
          activityId: "2",
        },
        {
          id: (++id).toString(),
          title: "Programação",
          weekDay: "Sábado",
          schedule: "10:00 - 11:30",
          level: "Intermediário",
          activityId: "8",
        },
      ]
    });
    return mockResponse.data;
  }
}
