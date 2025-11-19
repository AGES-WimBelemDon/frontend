import { useNavigate, type Location } from "react-router";

import type { Id } from "../types/id";

export type ValidRoute =
  | "/"
  | "/frequencias/atividades"
  | "/frequencias/chamada-geral"
  | "/alunos"
  | "/anamnese"
  | "/atividades"
  | "/login"
  | "/turmas"
  | "/usuarios"
  | "/tech-demo"
  ;

export type LocationState = {
  from?: Location;
};

export function useRoutes() {
  const navigate = useNavigate();

  function goTo(baseRoute: ValidRoute, path: string = "") {
    const normalizedBase = String(baseRoute).replace(/^\/frontend\/?/, "");
    const normalizedPath = String(path);
    const to = `${normalizedBase.startsWith("/") ? normalizedBase : `/${normalizedBase}`}${normalizedPath}`;
    navigate(to);
  }

  function goBack() {
    const pathname = String(window.location.pathname).replace(/^\/frontend\/?/, "");
    const previousRoute = pathname.split("/")[1];

    const routesWithHistory = ["alunos", "turmas", "anamnese"];
    if (previousRoute && routesWithHistory.includes(previousRoute)) {
      navigate(`/${previousRoute}`);
      return;
    }

    if (window.history.length <= 2) {
      navigate("/");
      return;
    }

    navigate(-1);
  }

  function getPathParamId(previousParamName: string): Id | null {
    const pathname = String(window.location.pathname).replace(/^\/frontend\/?/, "");
    const pathSegments = pathname.split("/").filter(Boolean);
    const paramIndex = pathSegments.indexOf(previousParamName);
    if (paramIndex !== -1 && paramIndex + 1 < pathSegments.length) {
      return pathSegments[paramIndex + 1];
    }
    return null;
  }

  function replaceSearchParams(params: URLSearchParams) {
    const search = params.toString();
    const pathname = String(window.location.pathname).replace(/^\/frontend\/?/, "");
    const path = `${pathname.startsWith("/") ? pathname : `/${pathname}`}${search ? `?${search}` : ""}`;
    navigate(path, { replace: true });
  }

  const allowedRoutes: ValidRoute[] = [
    "/",
    "/alunos",
    "/atividades",
    "/anamnese",
    "/frequencias/atividades",
    "/frequencias/chamada-geral",
    "/login",
    "/turmas",
    "/usuarios",
    "/tech-demo",
  ];

  return {
    goTo,
    goBack,
    getPathParamId,
    replaceSearchParams,
    allowedRoutes,
  };
}
