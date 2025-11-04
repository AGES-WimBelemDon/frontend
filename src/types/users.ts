import type { Role, UserStatus } from "./filters";

export type GetUsersParams = {
  status?: UserStatus;
}

export type UserResponse = {
  id: number;
  fullName: string;
  email: string;
  status: UserStatus;
  role: Role;
};

export type UserRegister = {
  name: string;
  email: string;
};

export type UserLogin = {
  token: string;
};
