export const portugueseTextMap = {
  home: {
    description: "Em Desenvolvimento"
  },
  techDemo: {
    title: "Tech Demo",
    fetching: "Atualizando...",
    showAPIInfo: "Mostrar informações da API",
    children: {
      mockAPI: {
        detail: ({ c2 }: { c2: string }) => (
          `Recebi um parâmetro na URL: ${c2}`
        ),
        apiError: ({ message }: { message: string }) => (
          `Erro na API: ${message}`
        ),
      },
      profile: {
        loading: "Carregando informações do perfil...",
        noUser: "Nenhum usuário conectado",
        title: "Informações do Perfil",
        noEmail: "Email não encontrado",
        email: ({ email }: { email: string }) => `Email: ${email}`,
        noName: "Nome não encontrado",
        name: ({ name }: { name: string }) => `Nome: ${name}`,
        signInGoogle: "Conectar com Google",
        signOut: "Sair"
      }
    }
  }
} as const;
