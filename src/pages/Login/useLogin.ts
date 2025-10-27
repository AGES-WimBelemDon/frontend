import { useContext, useEffect, useState } from "react";

import type { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router";

import { strings } from "../../constants";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import type { LocationState } from "../../hooks/useRoutes";
import { useToast } from "../../hooks/useToast";
import { loginWithGoogle } from "../../services/auth.firebase";
import { login as loginApi } from "../../services/users";

export function useLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, isLoadingAuth, refreshAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  function getLoginErrorKeyFromAxios(error: unknown): keyof typeof strings.login.errors | "generic" {
    const axiosError = error as AxiosError;
    const axiosErrorData = axiosError.response?.data as { code?: string; message?: string } | undefined;

    const code: string | undefined = axiosErrorData?.code;
    if (code) {
      switch (code) {
      case "INVALID_TOKEN":
        return "invalidToken";
        
      case "USER_NOT_REGISTERED":
        return "notRegistered";
        
      case "USER_INACTIVE":
        return "inactive";
        
      default:
        return "generic";
      }
    }

    const message: string | undefined = axiosErrorData?.message;
    if (message) {
      const normalized = message.toLowerCase();
      if (normalized.includes("invalid firebase token")) {
        return "invalidToken";
      }

      if (normalized.includes("not registered")) {
        return "notRegistered";
      }

      if (normalized.includes("not active") || normalized.includes("inactive")) {
        return "inactive";
      }
    }

    return "generic";
  }

  function getLoginErrorKeyFromFirebase(error: unknown): keyof typeof strings.login.errors | "generic" {
    const firebaseError = error as { code?: string };
    switch (firebaseError.code) {
    case "auth/popup-closed-by-user":
      return "popupClosed";
      
    case "auth/popup-blocked":
      return "popupBlocked";
      
    case "auth/cancelled-popup-request":
      return "popupCancelled";
      
    case "auth/network-request-failed":
      return "network";
      
    default:
      return "generic";
    }
  }

  async function handleGoogleLogin() {
    setIsLoggingIn(true);
    
    try {
      const token = await loginWithGoogle();

      await loginApi(token);

      await refreshAuth();
    } catch (error) {
      const firebaseErrorKey = getLoginErrorKeyFromFirebase(error);
      const errorKey = firebaseErrorKey !== "generic" ? firebaseErrorKey : getLoginErrorKeyFromAxios(error);
      const message = strings.login.errors[errorKey] ?? strings.login.errors.generic;
      showToast(message, "error", true);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  }

  useEffect(
    function autoRedirectIfAuthenticated() {
      if (isLoadingAuth) {
        return;
      }

      if (user?.firebaseToken) {
        const state = location.state as LocationState;
        const from = state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    },
    [isLoadingAuth, user, location, navigate]
  );

  return {
    isLoggingIn,
    handleGoogleLogin,
  };
}
