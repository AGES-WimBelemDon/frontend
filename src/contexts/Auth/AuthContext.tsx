import { createContext } from "react";

import type { UserResponse } from "../../types/user.types";

export type AuthUser = UserResponse & {
  firebaseToken: string;
  photoURL: string | null;
};

export type AuthContextType = {
  user: AuthUser | null;
  isLoadingAuth: boolean;
  refreshAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoadingAuth: true,
  refreshAuth: async function refreshAuth() {
    return Promise.resolve();
  },
});
