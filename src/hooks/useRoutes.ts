import { useNavigate } from "react-router";

export type ValidRoute = 
  | "/"
  | "/frequencias/atividades"
  | "/frequencias/chamada-geral"
  | "/alunos"
  | "/atividades"
  | "/turmas"
  | "/usuarios"
  | "/tech-demo"
;

export function useRoutes() {
  const navigate = useNavigate();

  function goTo(baseRoute: ValidRoute, path: string = "") {
    navigate(`${baseRoute}${path}`);
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

  const allowedRoutes: ValidRoute[] = [
    "/",
    "/alunos",
    "/atividades",
    "/frequencias/atividades",
    "/frequencias/chamada-geral",
    "/turmas",
    "/usuarios",
    "/tech-demo",
  ];

  return {
    goTo,
    goBack,
    getPathParamId,
    allowedRoutes,
  };
}
