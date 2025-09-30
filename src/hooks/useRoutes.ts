import { useNavigate } from "react-router";

export type ValidRoute = 
  | "/"
  | "/frequencias/atividades"
  | "/alunos"
  | "/atividades"
  | "/turmas"
  | "/usuarios"
  | "/tech-demo"
;

export function useRoutes() {
  const navigate = useNavigate();

  function goTo(route: ValidRoute | string) {
    navigate(route);
  }

  function goBack() {
    navigate(-1);
  }

  function getPathParamId(previousParamName: string) {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const paramIndex = pathSegments.indexOf(previousParamName);
    if (paramIndex !== -1 && paramIndex + 1 < pathSegments.length) {
      return pathSegments[paramIndex + 1];
    }
    return null;
  }

  return {
    goTo,
    goBack,
    getPathParamId,
    allowedRoutes: [
      "/",
      "/alunos",
      "/atividades",
      "/frequencias/atividades",
      "/turmas",
      "/usuarios",
      "/tech-demo",
    ],
  };
}
