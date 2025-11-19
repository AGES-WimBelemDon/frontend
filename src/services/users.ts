import { api, endpoints } from "./api";
import type { Id } from "../types/id";
import type { UserRegister, UserResponse, GetUsersParams, UserEdit } from "../types/users";


export async function registerUser(user: UserRegister): Promise<UserResponse> {
  try {
    const response = await api.post<UserResponse>(endpoints.users.register, user);
    return response.data;
  } catch {
    throw new Error("Error on servicesRegisterUser");
  }
}

export async function login(token: string): Promise<UserResponse> {
  try {
    const response = await api.post<UserResponse>(endpoints.users.login, { token });
    return response.data;
  } catch {
    throw new Error("Error on servicesLogin");
  }
}

export async function getUsers({
  status,
  role,
}: GetUsersParams): Promise<UserResponse[]> {
  try {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (role) {
      params.append("role", role);
    }
    const paramsString = params.size === 0 ? "" : `?${params.toString()}`;
    const endpoint = `${endpoints.users.base}${paramsString}`;
    const response = await api.get<UserResponse[]>(endpoint);
    return response.data;
  } catch {
    throw new Error("Error on servicesGetUsers");
  }
}

export async function getUserById(userId: Id): Promise<UserResponse> {
  try {
    const response = await api.get<UserResponse>(endpoints.users.byId(userId));
    return response.data;
  } catch {
    throw new Error("Error on servicesGetUserById");
  }
}

export async function updateUser(userId: Id, payload: Partial<UserEdit>): Promise<UserResponse> {
  try {
    const response = await api.patch<UserResponse>(endpoints.users.byId(userId), payload);
    return response.data;
  } catch {
    throw new Error("Error on servicesUpdateUser");
  }
}

export async function disableUser(userId: Id): Promise<void> {
  try {
    await api.patch(endpoints.users.disableById(userId));
  } catch {
    throw new Error("Error on servicesDisableUser");
  }
}

export async function enableUser(userId: Id): Promise<void> {
  try {
    await api.patch(endpoints.users.enableById(userId));
  } catch {
    throw new Error("Error on servicesEnableUser");
  }
}
