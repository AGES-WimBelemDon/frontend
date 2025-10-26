import { createContext } from "react";

import type { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  isLoadingAuth: boolean;
};

const mockUser = {
  uid: "mock-uid-123",
  email: "mockuser@example.com",
  displayName: "Usuário Mock",
} as unknown as User;

export const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  isLoadingAuth: false,
});
