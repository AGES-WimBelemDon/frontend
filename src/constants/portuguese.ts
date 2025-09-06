export const portugueseTextMap = {
  header: {
    openSidebar: 'Abrir menu lateral',
    goToHome: 'Ir para a página inicial',
    logoAlt: 'Logotipo do WimBelemDon',
    profileLogin: 'Conectar com Google',
    profileLogout: 'Sair',
  },
  home: {
    description: 'Em Desenvolvimento'
  },
  techDemo: {
    title: 'Tech Demo',
    fetching: 'Atualizando...',
    showAPIInfo: 'Mostrar informações da API',
    children: {
      mockAPI: {
        detail: ({ c2 }: { c2: string }) => (
          `Recebi um parâmetro na URL: ${c2}`
        ),
        apiError: ({ message }: { message: string }) => (
          `Erro na API: ${message}`
        ),
      },
    }
  },
  textCard: {
    exploreHome: 'Visitar Página Inicial',
  },
  frequency: {
    takeAttendance: 'Realizar Chamada'
  }
} as const;
