import { api, endpoints } from "./api";
import type { UserRegister, UserResponse, UserDetailed, GetUsersParams } from "../types/user.types";

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
    // TODO: Remove this once backend logic is in place
    const mockUser: UserResponse = {
      id: 1,
      fullName: "Tenista",
      email: "tenista@wimbelemdon.com.br",
      status: "ATIVO",
      role: {
        id: 1,
        name: "Admin",
        description: "Administrator role",
      },
    }
    return mockUser;
    console.error("API Error in login:", error);
    throw new Error("Error logging in user");
  }
}

export async function getUsers({
  status,
}: GetUsersParams): Promise<UserResponse[]> {
  try {
    const endpoint = status ? `${endpoints.users.getAll}?status=${status}` : endpoints.users.getAll;
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
          role: {
            id: 1,
            name: "Admin",
            description: "Administrator role",
          },
        } as UserResponse,
        {
          id: id++,
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
          status: "INATIVO",
          role: {
            id: 2,
            name: "User",
            description: "Regular user role",
          },
        } as UserResponse,
      ],
    });
    return mockResponse.data;
  }
}

export async function getUserById(userId: number): Promise<UserDetailed> {
  try {
    const response = await api.get<UserDetailed>(endpoints.users.getById(userId));
    return response.data;
  } catch (error) {
    console.error("API Error in getUserById:", error);
    throw new Error("Error fetching user");
  }
}

export async function disableUser(userId: number): Promise<void> {
  try {
    await api.patch(endpoints.users.disable(userId));
  } catch (error) {
    console.error("API Error in disableUser:", error);
    throw new Error("Error disabling user");
  }
}

export async function enableUser(userId: number): Promise<void> {
  try {
    await api.patch(endpoints.users.enable(userId));
  } catch (error) {
    console.error("API Error in enableUser:", error);
    throw new Error("Error enabling user");
  }
}
