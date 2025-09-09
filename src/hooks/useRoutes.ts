import { useNavigate } from 'react-router';

type ValidRoute = '/'
  | '/alunos'
  | '/atividades'
  | '/cadastro'
  | '/frequencias/atividades'
  | '/tech-demo'
  | '/turmas';

export function useRoutes() {
  const navigate = useNavigate();

  function goTo(route: ValidRoute | string) {
    navigate(route);
  }

  function getPathParamId(previousParamName: string) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const paramIndex = pathSegments.indexOf(previousParamName);
    if (paramIndex !== -1 && paramIndex + 1 < pathSegments.length) {
      return pathSegments[paramIndex + 1];
    }
    return null;
  }

  return {
    goTo,
    getPathParamId,
    allowedRoutes: [
      '/',
      '/alunos',
      '/atividades',
      '/cadastro',
      '/frequencias/atividades',
      '/tech-demo',
      '/turmas',
    ],
  };
}
