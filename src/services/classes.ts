import dayjs from "dayjs";

import { api, endpoints } from "./api";
import type { Classes } from "../components/ClassesModal/interface";
import type { ApiClass, StudentFrequency } from "../types/classes";
import type { Id } from "../types/id";


export async function createClasses(data: ApiClass): Promise<number | null> {
  try {
    const response = await api.post(endpoints.classes.base, data)
    return response.status;
  } catch {
    return null;
  }
}

export async function getClasses(): Promise<ApiClass[]> {
  try {
    const response = await api.get<ApiClass[]>(endpoints.classes.base);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
          name: "Yoga Iniciante",
          activityId: 7,
          levelId: "1",
          state: "ATIVA",
          teachersId: [2],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("08:00", "HH:mm"),
          endTime: dayjs("09:00", "HH:mm"),
          weekDay: ["SEGUNDA", "QUARTA"]
        },
        {
          id: ++id,
          name: "Yoga Intermediário",
          activityId: 7,
          levelId: "2",
          state: "ATIVA",
          teachersId: [1],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("09:00", "HH:mm"),
          endTime: dayjs("10:00", "HH:mm"),
          weekDay: ["TERCA", "QUINTA"]
        },
        {
          id: ++id,
          name: "Bate-papo Semanal",
          activityId: 1,
          levelId: "2",
          state: "ATIVA",
          teachersId: [5],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("19:00", "HH:mm"),
          endTime: dayjs("20:00", "HH:mm"),
          weekDay: ["SEXTA"]
        },
        {
          id: ++id,
          name: "Tênis Iniciante",
          activityId: 2,
          levelId: "1",
          state: "ATIVA",
          teachersId: [1],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("07:00", "HH:mm"),
          endTime: dayjs("08:00", "HH:mm"),
          weekDay: ["TERCA"]
        },
        {
          id: ++id,
          name: "Tênis Avançado",
          activityId: 2,
          levelId: "3",
          state: "ATIVA",
          teachersId: [1],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("07:00", "HH:mm"),
          endTime: dayjs("08:00", "HH:mm"),
          weekDay: ["QUINTA"]
        },
        {
          id: ++id,
          name: "Tênis Avançado",
          activityId: 2,
          levelId: "3",
          state: "ATIVA",
          teachersId: [1],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("07:00", "HH:mm"),
          endTime: dayjs("08:00", "HH:mm"),
          weekDay: ["QUINTA"]
        },
        {
          id: ++id,
          name: "Programação",
          activityId: 8,
          levelId: "1",
          state: "ATIVA",
          teachersId: [8],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("07:00", "HH:mm"),
          endTime: dayjs("08:00", "HH:mm"),
          weekDay: ["SEXTA"]
        },
        {
          id: ++id,
          name: "Culinária Básica",
          activityId: 4,
          levelId: "1",
          state: "ATIVA",
          teachersId: [7],
          isRecurrent: false,
          startDate: "2024-01-01",
          endDate: "2024-06-30",
          startTime: dayjs("15:00", "HH:mm"),
          endTime: dayjs("16:00", "HH:mm"),
          weekDay: ["QUARTA"]
        }
      ],
    });
    return mockResponse.data;
  }
}

export async function getClassFrequency({ id }: { id: Id }): Promise<StudentFrequency[]> {
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

export async function patchClass({ id }: { id: number }) {
  try {
    const response = await api.patch<Classes>(endpoints.classes.byId(id))
    return response.status;
  } catch {
    return null;
  }
}