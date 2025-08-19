export const portugueseTextMap = {
  home: {
    description: 'Em Desenvolvimento'
  },
  techDemo: {
    title: 'Tech Demo',
    goHomeButton: ({ time }: { time: number }) => (
      `Voltar para tela inicial em ${time} segundos`
    ),
    fetching: 'Atualizando...',
    child: {
      detail: ({ c2 }: { c2: string }) => (
        `Recebi um parâmetro na URL: ${c2}`
      ),
      apiError: ({ message }: { message: string }) => (
        `Erro na API: ${message}`
      ),
    }
  }
} as const;
