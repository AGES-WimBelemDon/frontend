import dayjs from "dayjs";

import { api, endpoints } from "./api";
import type { ApiClass, Classes, StudentFrequencyClass } from "../types/classes";
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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
          teachers: [],
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

export async function getClassFrequency({ id, date }: { id: Id; date: string }): Promise<StudentFrequencyClass> {
  try {
    const classFrequencyPrefix = endpoints.frequencies.specific;
    const classFrequencyQuery = new URLSearchParams({ classId: id.toString(), date });
    const classFrequencyEndpoint = `${classFrequencyPrefix}?${classFrequencyQuery.toString()}`;
    const response = await api.get<StudentFrequencyClass>(classFrequencyEndpoint);
    return response.data;
  } catch {

    const mockResponse = await Promise.resolve({
      data: {
        classId: 1,
        date: "2024-06-01",
        studentList: [
          { id: 1, name: "Ana Souza", frequency: 90 },
          { id: 2, name: "Carlos Lima", frequency: 75 },
          { id: 3, name: "Fernanda Alves", frequency: 45 },
        ]
      } as StudentFrequencyClass,
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