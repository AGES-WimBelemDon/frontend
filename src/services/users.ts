import { api } from "./api";

type Users = {
    id: string;
    full_name: string;
    phone: number;
    access: string;
    formation: string;
    email: string;
}

export async function getUsers(): Promise<Users[]> {
  try {
    const response = await api.get<Users[]>("/users");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          "id": (++id).toString(),
          "full_name": "Roberto Almeida da Silva",
          "phone": 5511987654321,
          "access": "admin",
          "formation": "Educação Física com especialização em Gestão de Projetos Sociais",
          "email": "roberto.silva@saquecerto.org"
        },
        {
          "id": (++id).toString(),
          "full_name": "Mariana Gonçalves Pereira",
          "phone": 5521998765432,
          "access": "coordenador",
          "formation": "Pedagogia",
          "email": "mariana.pereira@saquecerto.org"
        },
        {
          "id": (++id).toString(),
          "full_name": "Carlos Eduardo Lima",
          "phone": 5531987654323,
          "access": "instrutor",
          "formation": "Ex-atleta profissional de Tênis, Certificação CBT Nível 3",
          "email": "carlos.lima@saquecerto.org"
        },
        {
          "id": (++id).toString(),
          "full_name": "Juliana Santos Costa",
          "phone": 5551998765434,
          "access": "instrutor",
          "formation": "Educação Física",
          "email": "juliana.costa@saquecerto.org"
        },
        {
          "id": (++id).toString(),
          "full_name": "Fernanda Oliveira",
          "phone": 5541987654325,
          "access": "psicologo",
          "formation": "Psicologia com especialização em Psicologia do Esporte",
          "email": "fernanda.oliveira@saquecerto.org"
        },
        {
          "id": (++id).toString(),
          "full_name": "Lucas Martins Rodrigues",
          "phone": 5561998765436,
          "access": "administrativo",
          "formation": "Administração de Empresas",
          "email": "lucas.rodrigues@saquecerto.org"
        },
      ],
    });
    return mockResponse.data;
  }
}