import { useEffect, useState, type PropsWithChildren } from 'react';

import { onAuthStateChanged, type User } from 'firebase/auth';

import { AuthContext } from './AuthContext';
import { auth } from '../../firebase';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(function loadUser() {
    if (!auth) {
      setIsLoadingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
