import { api, endpoints } from "./api";
import type { Id } from "../types/id";
import type { UserRegister, UserResponse, GetUsersParams, UserEdit } from "../types/users";


export async function registerUser(user: UserRegister): Promise<UserResponse> {
  try {
    const response = await api.post<UserResponse>(endpoints.users.register, user);
    return response.data;
  } catch (error) {
    console.error("API Error in registerUser:", error);
    throw new Error("Error registering user");
  }
}

export async function login(token: string): Promise<UserResponse> {
  try {
    const response = await api.post<UserResponse>(endpoints.users.login, { token });
    return response.data;
  } catch (error) {
    console.error("API Error in login:", error);
    throw new Error("Error logging in user");
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
  } catch (error) {
    console.error("API Error in getUsers:", error);
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: id++,
          fullName: "John Doe",
          email: "john.doe@example.com",
          status: "ATIVO",
          role: "admin",
        } as UserResponse,
        {
          id: id++,
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
          status: "INATIVO",
          role: "teacher",
        } as UserResponse,
      ],
    });
    return mockResponse.data;
  }
}

export async function getUserById(userId: Id): Promise<UserResponse> {
  try {
    const response = await api.get<UserResponse>(endpoints.users.byId(userId));
    return response.data;
  } catch (error) {
    console.error("API Error in getUserById:", error);
    throw new Error("Error fetching user");
  }
}

export async function updateUser(userId: Id, payload: Partial<UserEdit>): Promise<UserResponse> {
  try {
    const response = await api.patch<UserResponse>(endpoints.users.byId(userId), payload);
    return response.data;
  } catch (error) {
    console.error("API Error in updateUser:", error);
    throw new Error("Error updating user");
  }
}

export async function disableUser(userId: Id): Promise<void> {
  try {
    await api.patch(endpoints.users.disableById(userId));
  } catch (error) {
    console.error("API Error in disableUser:", error);
    throw new Error("Error disabling user");
  }
}

export async function enableUser(userId: Id): Promise<void> {
  try {
    await api.patch(endpoints.users.enableById(userId));
  } catch (error) {
    console.error("API Error in enableUser:", error);
    throw new Error("Error enabling user");
  }
}
