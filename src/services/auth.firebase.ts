import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../firebase';

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const token = await result.user.getIdToken();
  return { user: result.user, token };
}

export async function logout() {
  await signOut(auth);
}
