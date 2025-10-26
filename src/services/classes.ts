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
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          title: "Yoga Iniciante",
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
          title: "Tênis Iniciante",
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
        },
        {
          id: (++id).toString(),
          title: "Programação",
          weekDay: "Sab",
          schedule: "10:00 - 11:30",
          level: "Intermediário",
          activityId: "8",
          teacher: "Professora F"
        },
        {
          id: (++id).toString(),
          title: "Culinária Básica",
          weekDay: "Sab",
          schedule: "10:00 - 11:30",
          level: "Iniciante",
          activityId: "8",
          teacher: "Professora G"
        }
      ],
    });
    return mockResponse.data;
  }
}

export async function createClasses(data: ApiClass): Promise<number | null> {
  try {
    const response = await api.post(endpoints.classes, data)
    return response.status;
  } catch {
    return null;
  }
}