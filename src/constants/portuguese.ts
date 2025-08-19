export const portugueseTextMap = {
  home: {
    description: 'Em Desenvolvimento'
  },
  techDemo: {
    title: 'Tech Demo',
    description: ({ value }: { value: number }) => (
      `c² = ${value}`
    ),
    goHomeButton: ({ time }: { time: number }) => (
      `Voltar para tela inicial em ${time} segundos`
    ),
    fetching: 'Atualizando...',
    apiError: ({ message }: { message: string }) => (
      `Erro na API: ${message}`
    )
  }
} as const;
