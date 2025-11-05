import { api, endpoints } from "./api";

type ApiClass = {
  id: string;
  name: string;
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
    const response = await api.post(endpoints.classes.all, data)
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
          id: String(++id),
          name: "Yoga para Iniciantes",
          weekDay: "Segunda-feira",
          schedule: "08:00 - 09:00",
          level: "Iniciante",
          activityId: "7",
          teacher: "Professora A"
        },
        {
          id: String(++id),
          name: "Yoga Intermediário",
          weekDay: "Segunda-feira",
          schedule: "09:00 - 10:00",
          level: "Intermediário",
          activityId: "7",
          teacher: "Professor B"
        },
        {
          id: String(++id),
          name: "Bate-papo semanal",
          weekDay: "Quarta-feira",
          schedule: "19:00 - 20:00",
          level: "Todos os níveis",
          activityId: "1",
          teacher: "Professora C"
        },
        {
          id: String(++id),
          name: "Tênis para Iniciantes",
          weekDay: "Terça-feira",
          schedule: "18:30 - 19:30",
          level: "Iniciante",
          activityId: "2",
          teacher: "Professor D"
        },
        {
          id: String(++id),
          name: "Tênis Avançado",
          weekDay: "Quinta-feira",
          schedule: "07:00 - 08:00",
          level: "Avançado",
          activityId: "2",
          teacher: "Professor E"
        },
        {
          id: String(++id),
          name: "Programação",
          weekDay: "Sábado",
          schedule: "10:00 - 11:30",
          level: "Intermediário",
          activityId: "8",
          teacher: "Professora F"
        },
        {
          id: String(++id),
          name: "Culinária Básica",
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