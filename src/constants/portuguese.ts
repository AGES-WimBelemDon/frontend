import type { Params } from "./type";

export const portugueseTextMap = {
  buttonCard: {
    frequency: ({ percent }: Params<"percent">) => (
      `Frequência: ${percent}%`
    ),
  },
  dateInput: {
    selectDate: "Selecione a data",
  },
  filters: {
    race: {
      white: "Branca",
      black: "Preta",
      brown: "Parda",
      yellow: "Asiática",
      indigenous: "Indígena",
      notDeclared: "Não Declarado",
    },
    gender: {
      male: "Masculino",
      female: "Feminino",
      other: "Outro",
    },
    socialPrograms: {
      bolsaFamilia: "Bolsa Família",
      bpcLoas: "BPC/LOAS",
      tarifaSocialDeEnergia: "Tarifa Social de Energia",
      auxilioGas: "Auxílio Gás",
      programaEstadual: "Programa Estadual",
      programaMunicipalViaCras: "Programa Municipal via CRAS",
    },
    employmentStatus: {
      employed: "Empregado",
      unemployed: "Desempregado",
      student: "Estudante",
      other: "Outro",
    },
    educationLevel: {
      none: "Nenhum",
      literate: "Alfabetizado",
      incompleteElementary: "Fundamental Incompleto",
      completeElementary: "Fundamental Completo",
      incompleteHighSchool: "Ensino Médio Incompleto",
      completeHighSchool: "Ensino Médio Completo",
      incompleteHigher: "Superior Incompleto",
      completeHigher: "Superior Completo",
      posGraduation: "Pós-Graduação",
    },
  },
  header: {
    goToHome: "Ir para a página inicial",
    logoAlt: "Logotipo do WimBelemDon",
  },
  frequency: {
    title: "Realizar Chamada",
    loadingActivities: "Carregando atividades...",
    activitiesError: "Erro ao carregar atividades",
  },
  frequencyCall: {
    title: ({ activity, classTitle }: Params<"activity" | "classTitle">) => (
      `Chamada - ${activity} - ${classTitle}`
    ),
    save: "Salvar",
    loadingStudents: "Carregando estudantes...",
    studentsError: "Erro ao carregar estudantes",
    errorNoStudents: "Erro ao salvar a chamada, estudantes não encontrados",
    errorNoDate: "Erro ao salvar chamada, por favor insira uma data",
    successSave: "Chamada registrada com sucesso",
  },
  frequencyCard: {
    absentDetails: "Adicionar Observação",
  },
  frequencyClasses: {
    title: ({ activity }: Params<"activity">) => `Realizar Chamada - ${activity}`,
    loadingClasses: "Carregando turmas...",
    classesError: "Erro ao carregar turmas",
  },
  sidebar: {
    openSidebar: "Abrir menu lateral",
    listIcon: ({ to }: Params<"to">) => (
      `Navegar para a página ${to}`
    ),
  },
  techDemo: {
    title: "Tech Demo",
    fetching: "Atualizando...",
    showAPIInfo: "Mostrar informações da API",
    children: {
      mockAPI: {
        detail: ({ c2 }: Params<"c2">) => (
          `Recebi um parâmetro na URL: ${c2}`
        ),
        apiError: ({ message }: Params<"message">) => (
          `Erro na API: ${message}`
        ),
      },
    }
  },
  textCard: {
    exploreHome: "Visitar Página Inicial",
  },
  toast: {
    success: ({ message }: Params<"message">) => (`Sucesso: ${message}`),
    error: ({ message }: Params<"message">) => (`Erro: ${message}`),
    info: ({ message }: Params<"message">) => (`Info: ${message}`),
    warning: ({ message }: Params<"message">) => (`Aviso: ${message}`),
  },
  userProfile: {
    login: "Conectar com Google",
    logout: "Sair",
  },
} as const;
