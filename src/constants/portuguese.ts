export const portugueseTextMap = {
  buttonCard: {
    frequency: ({ percent }: { percent: number }) => (
      `Frequência: ${percent}%`
    ),
  },
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
  frequency: {
    takeAttendance: 'Realizar Chamada'
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
  toast: {  
    success: ({ message }: { message: string }) => (`Sucesso: ${message}`),  
    error: ({ message }: { message: string }) => (`Erro: ${message}`),  
    info: ({ message }: { message: string }) => (`Info: ${message}`),  
    warning: ({ message }: { message: string }) => (`Aviso: ${message}`),  
  }
} as const;
