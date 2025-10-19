/**
 * Shared types that match the backend API responses exactly.
 * These types should be kept in sync with backend DTOs.
 */

export type UserStatus = "ATIVO" | "INATIVO";

export type UserRole = {
  id: number;
  name: string;
  description: string | null;
};

export type UserResponse = {
  id: number;
  fullName: string;
  email: string;
  status: UserStatus;
  role: UserRole | null;
};

export type UserDetailed = UserResponse;

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
