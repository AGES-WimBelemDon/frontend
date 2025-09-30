import type { Params } from "./type";

export const portugueseTextMap = {
  activityList: {
    title: "Lista de Atividades",
    loadingActivities: "Carregando atividades...",
    activitiesError: "Erro ao carregar atividades",
    activitiesEmpty: "Nenhuma atividade encontrada.",
    filters: {
      name: {
        title: "Nome",
        placeholder: "Nome da Atividade",
      },
      area: {
        title: "Área",
        placeholder: "Selecione a Área",
        sports: "Esportes",
        gym: "Academia",
        water: "Aquáticos",
      },
      frequency: {
        title: "Frequência",
        placeholder: "Selecione a Frequência",
        daily: "Diária",
        weekly: "Semanal",
        monthly: "Mensal",
      },
    },
    card: {
      area: "Área:",
      frequency: "Frequência:",
      teacher: "Professor:",
    },
  },
  classes: {
    title: "Minhas Turmas",
    loadingClasses: "Carregando turmas...",
    classesError: "Erro ao carregar turmas",
    createClass: "Criar turma",
    weekDay: "Dia da semana",
    schedule: "Horário",
    level: "Nível",
  },
  dateInput: {
    selectDate: "Selecione a data",
  },
  filters: {
    loading: "Carregando filtros...",
    all: "Todos",
    race: {
      title: "Raça",
      white: "Branca",
      black: "Preta",
      brown: "Parda",
      yellow: "Asiática",
      indigenous: "Indígena",
      notDeclared: "Não Declarado",
    },
    gender: {
      title: "Sexo",
      male: "Masculino",
      female: "Feminino",
      other: "Outro",
    },
    socialPrograms: {
      title: "Programas Sociais",
      bolsaFamilia: "Bolsa Família",
      bpcLoas: "BPC/LOAS",
      tarifaSocialDeEnergia: "Tarifa Social de Energia",
      auxilioGas: "Auxílio Gás",
      programaEstadual: "Programa Estadual",
      programaMunicipalViaCras: "Programa Municipal via CRAS",
    },
    employmentStatus: {
      title: "Vínculo Empregatício",
      employed: "Empregado",
      unemployed: "Desempregado",
      student: "Estudante",
      other: "Outro",
    },
    educationLevel: {
      title: "Nível de Escolaridade",
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
    frequency: ({ percent }: Params<"percent">) => (
      `Frequência: ${percent}%`
    ),
  },
  frequencyClasses: {
    title: ({ activity }: Params<"activity">) => `Realizar Chamada - ${activity}`,
    loadingClasses: "Carregando turmas...",
    classesError: "Erro ao carregar turmas",
    noClasses: "Nenhuma turma encontrada para esta atividade.",
    goBack: "Voltar para Atividades",
  },
  newResponsibleModal: {
    title: 'Cadastrar Responsável',
    buttonText: 'Adicionar Responsável',
    inputs: {
      name: 'Nome',
      cpf: 'CPF',
      birthDate: 'Data de Nascimento',
      civilState: 'Estado Civil',
      nis: 'NIS',
      address: 'Endereço',
      phone: 'Telefone',
      email: 'Email'
    },
    placeholder: {
      name: 'Digite o nome do responsável',
      cpf: 'Digite o CPF do responsável',
      nis: 'Digite o NIS do responsável',
      address: 'Digite o endereço do responsável',
      phone: 'Digite o telefone do responsável',
      email: 'Digite o email do responsável'
    }
  },
  sidebar: {
    openSidebar: "Abrir menu lateral",
    listIcon: ({ to }: Params<"to">) => (
      `Navegar para a página ${to}`
    ),
  },
  personCard: {
    userImageAlt: "Imagem do usuário",
    name: "Nome:",
    cpf: "CPF:",
    birthDate: "Nascimento:",
    civilState: "Estado Civil:",
    nis: "NIS:",
    phone: "Telefone:",
    email: "Email:",
    address: "Endereço:",
    editButton: "Editar",
  },
  studentRegistration: {
    personalInformation: "Informações Pessoais",
    name: "Nome",
    namePlaceholder: "Nome completo",
    dateOfBirth: "Data de Nascimento",
    address: {
      zipCode: "CEP",
      zipCodePlaceholder: "xxxxxxxx",
      street: "Logradouro",
      number: "Número",
      numberPlaceholder: "Número",
      complement: "Complemento",
      complementPlaceholder: "Apartamento, bloco, casa, etc.",
    },
    enrollmentDate: "Data de Cadastro",
    documents: "Documentos",
    registrationNumber: "Documento de Identidade (CPF)",
    attachments: "Anexos",
    attachMoreFiles: "Anexar mais documentos",
    selectFiles: "Selecionar arquivo",
    selectedFile: "Arquivo selecionado:",
    fileCreatedAt: "Data de criação do arquivo:",
    fileDescription: "Descrição do arquivo",
    cancelFileSend: "Cancelar envio do arquivo",
    addFileButton: "Adicionar arquivo",
    toggleStudentStatusOn: "Ativar estudante",
    toggleStudentStatusOff: "Desativar estudante",
    details: "Detalhes",
    schoolName: "Escola Atual",
    schoolNamePlaceholder: "Digite a escola atual do Educando",
    saveButton: "Salvar",
    cancelButton: "Cancelar",
    successMessage: "Estudante cadastrado com sucesso!",
    errorMessage: "Erro ao cadastrar estudante. Por favor, tente novamente.",
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
  users: {
    title: "Gerenciar Usuários",
    loadingUsers: "Carregando usuários...",
    usersError: "Erro ao carregar usuários",
  },
} as const;
