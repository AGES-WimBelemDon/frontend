import type { EmploymentStatus, Gender, Race, SchoolYear, SocialProgram } from "../pages/StudentRegistration/interface";

export function useFilters() {
  const genderOptions: Gender[] = [
    "Masculino",
    "Feminino",
    "Outro",
  ];

  const raceOptions: Race[] = [
    "Branca",
    "Preta",
    "Parda",
    "Asiática",
    "Indígena",
    "Não Declarada",
  ];

  const educationLevels: SchoolYear[] = [
    "Pré-Escola",
    "1º Ano do Ensino Fundamental",
    "2º Ano do Ensino Fundamental",
    "3º Ano do Ensino Fundamental",
    "4º Ano do Ensino Fundamental",
    "5º Ano do Ensino Fundamental",
    "6º Ano do Ensino Fundamental",
    "7º Ano do Ensino Fundamental",
    "8º Ano do Ensino Fundamental",
    "9º Ano do Ensino Fundamental",
    "1ª Série do Ensino Médio",
    "2ª Série do Ensino Médio",
    "3ª Série do Ensino Médio",
  ];

  const identityTypesOptions = [
    "RG",
    "CPF",
    "Certidão de Nascimento",
  ];

  const documentTypesOptions = [
    "Comprovante de Residência",
    "Comprovante de Renda",
    "Outro",
  ];
  
  const socialProgramOptions: SocialProgram[] = [
    "Bolsa Família",
    "BPC/LOAS",
    "Tarifa Social de Energia",
    "Auxílio Gás",
    "Programa Estadual",
    "Programa Municipal via CRAS",
  ]

  const employmentStatusOptions: EmploymentStatus[] = [
    "Empregado",
    "Desempregado",
    "Estudante",
  ];

  return {
    genderOptions,
    raceOptions,
    educationLevels,
    identityTypesOptions,
    documentTypesOptions,
    socialProgramOptions,
    employmentStatusOptions,
  };
}
