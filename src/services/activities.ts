import { api, endpoints } from "./api";
import type { Activity } from "../types/activities";

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>(endpoints.activities.base);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetActivities");
  }
}

export async function updateActivity(
  id: string,
  payload: { name: string }
): Promise<Activity> {
  try {
    const response = await api.patch<Activity>(
      endpoints.activities.patch(id),
      payload
    );
    return response.data;
  } catch {
    throw new Error("Error on servicesUpdateActivity");
  }
}

export async function createActivity(activity: Omit<Activity, "id">): Promise<Activity> {
  try {
    const response = await api.post<Activity>(endpoints.activities.base, activity);
    return response.data;
  } catch {
    throw new Error("Error on servicesCreateActivity");
  }
}
