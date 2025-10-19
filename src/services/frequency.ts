import { api } from "./api";

export type AvailableClass = {
  classId: number;
  className: string;
  classState: string;
  levelName: string | null;
  isGeral: boolean;
  activity: {
    activityId: number;
    activityName: string;
  };
};

export type AvailableClassesResponse = {
  classes: AvailableClass[];
};

export async function getAvailableClasses(userId: string): Promise<AvailableClass[]> {
  const response = await api.get<AvailableClassesResponse>(`/frequency/available-classes/${userId}`);
  return response.data.classes;
}
