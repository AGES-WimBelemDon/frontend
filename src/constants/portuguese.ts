import type { Params } from './type';

export const portugueseTextMap = {
  buttonCard: {
    frequency: ({ percent }: Params<'percent'>) => (
      `Frequência: ${percent}%`
    ),
  },
  dateInput: {
    selectDate: 'Selecione a data',
  },
  header: {
    goToHome: 'Ir para a página inicial',
    logoAlt: 'Logotipo do WimBelemDon',
  },
  frequency: {
    takeAttendance: 'Realizar Chamada'
  },
  frequencyCall: {
    title: 'Realizar Chamada',
    save: 'Salvar',
    errorNoStudents: 'Erro ao salvar a chamada, estudantes não encontrados',
    errorNoDate: 'Erro ao salvar chamada, por favor insira uma data',
    successSave: 'Chamada registrada com sucesso',
  },
  frequencyClasses: {
    takeAttendance: ({ activity }: Params<'activity'>) => `Realizar Chamada - ${activity}`
  },
  sidebar: {
    openSidebar: 'Abrir menu lateral',
    listIcon: ({ to }: Params<'to'>) => (
      `Navegar para a página ${to}`
    ),
  },
  techDemo: {
    title: 'Tech Demo',
    fetching: 'Atualizando...',
    showAPIInfo: 'Mostrar informações da API',
    children: {
      mockAPI: {
        detail: ({ c2 }: Params<'c2'>) => (
          `Recebi um parâmetro na URL: ${c2}`
        ),
        apiError: ({ message }: Params<'message'>) => (
          `Erro na API: ${message}`
        ),
      },
    }
  },
  textCard: {
    exploreHome: 'Visitar Página Inicial',
  },
  toast: {
    success: ({ message }: Params<'message'>) => (`Sucesso: ${message}`),
    error: ({ message }: Params<'message'>) => (`Erro: ${message}`),
    info: ({ message }: Params<'message'>) => (`Info: ${message}`),
    warning: ({ message }: Params<'message'>) => (`Aviso: ${message}`),
  },
  userProfile: {
    login: 'Conectar com Google',
    logout: 'Sair',
  },
} as const;
