import { api, endpoints } from "./api";

type ApiClass = {
  id: string;
  title: string;
  weekDay: string;
  schedule: string;
  level: string;
  activityId: string;
  teacher: string; 
};

export async function getClasses(): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>(endpoints.classes);
    return response.data;
  } catch {
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          title: "Yoga para Iniciantes",
          weekDay: "Seg, Qua",
          schedule: "08:00 - 09:00",
          level: "Iniciante",
          activityId: "7",
          teacher: "Professora A"
        },
        {
          id: (++id).toString(),
          title: "Yoga Intermediário",
          weekDay: "Ter, Qui",
          schedule: "09:00 - 10:00",
          level: "Intermediário",
          activityId: "7",
          teacher: "Professor B"
        },
        {
          id: (++id).toString(),
          title: "Bate-papo Semanal",
          weekDay: "Sex",
          schedule: "19:00 - 20:00",
          level: "Todos os níveis",
          activityId: "1",
          teacher: "Professora C"
        },
        {
          id: (++id).toString(),
          title: "Tênis para Iniciantes",
          weekDay: "Ter",
          schedule: "18:30 - 19:30",
          level: "Iniciante",
          activityId: "2",
          teacher: "Professor D"
        },
        {
          id: (++id).toString(),
          title: "Tênis Avançado",
          weekDay: "Qui",
          schedule: "07:00 - 08:00",
          level: "Avançado",
          activityId: "2",
          teacher: "Professor E"
        }
      ],
    });
    return mockResponse.data;
  }
}
