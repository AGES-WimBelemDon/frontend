import { useNavigate, type Location } from "react-router";

export type ValidRoute = 
  | "/"
  | "/frequencias/atividades"
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
    navigate(`${baseRoute}${path}`);
  }

  function goBack() {
    const previousRoute = window.location.pathname.split("/")[1];

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
    "/anamnese",
    "/frequencias/atividades",
    "/login",
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
