import { createContext } from 'react';

import type { User } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  isLoadingAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoadingAuth: true,
});
