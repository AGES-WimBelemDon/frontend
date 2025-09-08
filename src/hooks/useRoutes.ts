import { useNavigate } from 'react-router';

type ValidRoute = '/' | '/alunos' | '/atividades' | '/cadastro' | '/frequencias' | '/tech-demo' | '/turmas';

export function useRoutes() {
  const navigate = useNavigate();

  function goTo(route: ValidRoute | string) {
    navigate(route);
  }

  return {
    goTo,
    allowedRoutes: [
      '/',
      '/alunos',
      '/atividades',
      '/cadastro',
      '/frequencias',
      '/tech-demo',
      '/turmas',
    ],
  };
}
