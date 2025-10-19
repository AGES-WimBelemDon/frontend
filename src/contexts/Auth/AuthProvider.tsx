import { useEffect, useState, type PropsWithChildren } from "react";

import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";

import { AuthContext, type AuthUser } from "./AuthContext";
import { auth } from "../../firebase";
import { login } from "../../services/users";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  async function fetchBackendUser(firebaseUser: FirebaseUser) {
    try {
      const token = await firebaseUser.getIdToken();
      const backendUserData = await login(token);

      const authUser: AuthUser = {
        firebaseToken: token,
        photoURL: firebaseUser.photoURL,
        ...backendUserData,
      };

      setUser(authUser);
    } catch (error) {
      console.error("Failed to fetch backend user data:", error);
      setUser(null);
    } finally {
      setIsLoadingAuth(false);
    }
  }

  async function refreshAuth() {
    if (!auth?.currentUser) {
      return;
    }

    setIsLoadingAuth(true);
    await fetchBackendUser(auth.currentUser);
  }

  useEffect(
    function setupAuthListener() {
      if (!auth) {
        setIsLoadingAuth(false);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, function handleAuthStateChange(firebaseUser) {
        if (firebaseUser) {
          fetchBackendUser(firebaseUser);
        } else {
          setUser(null);
          setIsLoadingAuth(false);
        }
      });

      return function cleanup() {
        unsubscribe();
      };
    },
    []
  );

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
