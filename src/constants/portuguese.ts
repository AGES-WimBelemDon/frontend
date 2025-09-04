export const portugueseTextMap = {
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
  }
} as const;
