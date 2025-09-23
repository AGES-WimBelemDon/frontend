import { useContext } from "react";

import { AuthContext } from "../contexts/Auth/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
