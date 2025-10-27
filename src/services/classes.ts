import { api, endpoints } from "./api";

type ApiClass = {
  id: number;
  title: string;
  weekDay: string;
  schedule: string;
  level: string;
  activityId: string;
  teacher: string;
};

type StudentFrequency = {
  id: number;
  name: string;
  frequency: number;
}

export async function createClasses(data: ApiClass): Promise<number | null> {
  try {
    const response = await api.post(endpoints.classes, data)
    return response.status;
  } catch {
    return null;
  }
}

export async function getClasses(): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>(endpoints.classes.all);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
          title: "Yoga Iniciante",
          weekDay: "Seg, Qua",
          schedule: "08:00 - 09:00",
          level: "Iniciante",
          activityId: "7",
          teacher: "Professora A"
        },
        {
          id: ++id,
          title: "Yoga Intermediário",
          weekDay: "Ter, Qui",
          schedule: "09:00 - 10:00",
          level: "Intermediário",
          activityId: "7",
          teacher: "Professor B"
        },
        {
          id: ++id,
          title: "Bate-papo Semanal",
          weekDay: "Sex",
          schedule: "19:00 - 20:00",
          level: "Todos os níveis",
          activityId: "1",
          teacher: "Professora C"
        },
        {
          id: ++id,
          title: "Tênis Iniciante",
          weekDay: "Ter",
          schedule: "18:30 - 19:30",
          level: "Iniciante",
          activityId: "2",
          teacher: "Professor D"
        },
        {
          id: ++id,
          title: "Tênis Avançado",
          weekDay: "Qui",
          schedule: "07:00 - 08:00",
          level: "Avançado",
          activityId: "2",
          teacher: "Professor E"
        },
        {
          id: ++id,
          title: "Programação",
          weekDay: "Sab",
          schedule: "10:00 - 11:30",
          level: "Intermediário",
          activityId: "8",
          teacher: "Professora F"
        },
        {
          id: ++id,
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

export async function getClassFrequency({ id }: { id: number }): Promise<StudentFrequency[]> {
  try {
    const response = await api.get<StudentFrequency[]>(endpoints.classes.frequency(id));
    return response.data;
  } catch {

    const mockResponse = await Promise.resolve({
      data: [
        { id: 1, name: "Ana Souza", frequency: 90 },
        { id: 2, name: "Carlos Lima", frequency: 75 },
        { id: 3, name: "Fernanda Alves", frequency: 45 },
      ]
    });
    return mockResponse.data;
  }
}