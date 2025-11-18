import type { Address } from "./address";
import type { Role, UserStatus } from "./filters";
import type { Id } from "./id";

export type GetUsersParams = {
  status?: UserStatus;
  role?: Role;
}

export type UserResponse = {
  id: Id;
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

export type UserEdit = Partial<Omit<UserRegister, "name">> & {
  fullName?: string;
}

export type UserLogin = {
  token: string;
};
