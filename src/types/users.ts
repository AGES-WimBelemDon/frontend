import type { Role, UserStatus } from "./filters";

export type GetUsersParams = {
  status?: UserStatus;
}

export type UserResponse = {
  id: number;
  fullName: string;
  email: string;
  status: UserStatus;
  role: Role | null;
};

export type UserRegister = {
  name: string;
  email: string;
};

export type UserLogin = {
  token: string;
};

export function isUserActive(status: UserStatus): boolean {
  return status === "ATIVO";
}

export function getUserStatusDisplay(status: UserStatus): "active" | "inactive" {
  return status === "ATIVO" ? "active" : "inactive";
}
