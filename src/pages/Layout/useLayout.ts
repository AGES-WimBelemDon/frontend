import { useContext, useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router";

import { AuthContext } from "../../contexts/Auth/AuthContext";
import type { LocationState } from "../../hooks/useRoutes";

export function useLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoadingAuth } = useContext(AuthContext);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(
    function verifyAuthEffect() {
      async function verifyAuth() {
        if (isLoadingAuth) {
          return;
        }

        if (!user) {
          console.warn("No authenticated user found, redirecting to login");
          const state: LocationState = { from: location };
          navigate("/login", {
            replace: true,
            state,
          });
          return;
        }

        setIsVerifying(false);
      }

      verifyAuth();
    },
    [user, isLoadingAuth, navigate, location]
  );

  return { isVerifying: isLoadingAuth || isVerifying };
}
