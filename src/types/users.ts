import type { Address } from "./address";
import type { Role, UserStatus } from "./filters";

export type GetUsersParams = {
  status?: UserStatus;
  role?: Role;
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
  role: Role;
  address?: Address;
};

export type UserLogin = {
  token: string;
};
