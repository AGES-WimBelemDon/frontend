import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "../firebase";

export async function loginWithGoogle() {
  if (!auth) {
    throw new Error("Firebase auth not initialized");
  }
  
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const token = await result.user.getIdToken();
    
    return { user: result.user, token };
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

export async function logout() {
  if (!auth) {
    throw new Error("Firebase auth not initialized");
  }
  await signOut(auth);
}

export async function getAuthToken(): Promise<string | undefined> {
  if (!auth?.currentUser) {
    return;
  }
  return auth.currentUser.getIdToken();
}
