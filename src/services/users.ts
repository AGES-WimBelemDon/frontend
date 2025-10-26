import { api, endpoints } from "./api";

export type User = {
  id: string;
  full_name: string;
  phone: number;
  access: string;
  formation: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>(`${endpoints.users}?status=INATIVO`);
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          full_name: "Roberto Almeida da Silva",
          phone: 5511987654321,
          access: "admin",
          formation: "Educação Física com especialização em Gestão de Projetos Sociais",
          email: "roberto.silva@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Mariana Gonçalves Pereira",
          phone: 5521998765432,
          access: "coordenador",
          formation: "Pedagogia",
          email: "mariana.pereira@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Carlos Eduardo Lima",
          phone: 5531987654323,
          access: "instrutor",
          formation: "Ex-atleta profissional de Tênis, Certificação CBT Nível 3",
          email: "carlos.lima@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Juliana Santos Costa",
          phone: 5551998765434,
          access: "instrutor",
          formation: "Educação Física",
          email: "juliana.costa@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Fernanda Oliveira",
          phone: 5541987654325,
          access: "psicologo",
          formation: "Psicologia com especialização em Psicologia do Esporte",
          email: "fernanda.oliveira@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Mateus Ferreira",
          phone: 5571991122337,
          access: "administrativo",
          formation: "Administração Pública",
          email: "mateus.ferreira@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Beatriz Araújo",
          phone: 5581992233446,
          access: "financeiro",
          formation: "Contabilidade",
          email: "beatriz.araujo@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Eduardo Pires",
          phone: 5591993344555,
          access: "coordenador",
          formation: "Pedagogia e Gestão Escolar",
          email: "eduardo.pires@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Sofia Ramos",
          phone: 5511983344556,
          access: "instrutor",
          formation: "Educação Física",
          email: "sofia.ramos@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Rafael Pinto",
          phone: 5511976655443,
          access: "suporte",
          formation: "Tecnologia da Informação",
          email: "rafael.pinto@wimbelemdon.com",
        },
        {
          id: (++id).toString(),
          full_name: "Isabela Mota",
          phone: 5511967788990,
          access: "administrativo",
          formation: "Administração de Empresas",
          email: "isabela.mota@wimbelemdon.com",
        },
      ],
    });
    return mockResponse.data;
  }
}