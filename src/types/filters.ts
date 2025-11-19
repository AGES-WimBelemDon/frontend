export type FormType = "PSICOLOGIA" | "SOCIAL";

export type UserStatus = "ATIVO" | "INATIVO";

export type StudentStatus = "ATIVO" | "INATIVO";

export type FrequencyStatus = "PRESENTE" | "AUSENTE";

export type ClassState = "ATIVA" | "INATIVA";

export type Race =
  | "BRANCA"
  | "PRETA"
  | "PARDA"
  | "AMARELA"
  | "INDIGENA"
  | "NA"
  ;

export type Gender =
  | "MASCULINO"
  | "FEMININO"
  | "HOMEM_TRANS"
  | "MULHER_TRANS"
  | "NAO_BINARIO"
  | "OUTRO"
  ;

export type SocialPrograms =
  | "BOLSA_FAMILIA"
  | "BPC_LOAS"
  | "TARIFA_SOCIAL_DE_ENERGIA"
  | "AUXILIO_GAS"
  | "PROGRAMA_ESTADUAL"
  | "PROGRAMA_MUNICIPAL_VIA_CRAS"
  ;

export type EmploymentStatus =
  | "ESTUDANTE"
  | "EMPREGADO"
  | "DESEMPREGADO"
  | "ESTAGIARIO"
  | "APRENDIZ"
  | "AUTONOMO"
  | "OUTRO"
  ;

export type SchoolYear =
  | "EDUCACAO_INFANTIL"
  | "FUNDAMENTAL_1"
  | "FUNDAMENTAL_2"
  | "FUNDAMENTAL_3"
  | "FUNDAMENTAL_4"
  | "FUNDAMENTAL_5"
  | "FUNDAMENTAL_6"
  | "FUNDAMENTAL_7"
  | "FUNDAMENTAL_8"
  | "FUNDAMENTAL_9"
  | "ENSINO_MEDIO_1"
  | "ENSINO_MEDIO_2"
  | "ENSINO_MEDIO_3"
  | "EJA"
  ;

export type EducationLevel =
  | "NENHUM"
  | "ALFABETIZADO"
  | "FUNDAMENTAL_INCOMPLETO"
  | "FUNDAMENTAL_COMPLETO"
  | "ENSINO_MEDIO_INCOMPLETO"
  | "ENSINO_MEDIO_COMPLETO"
  | "SUPERIOR_INCOMPLETO"
  | "SUPERIOR_COMPLETO"
  | "POS_GRADUACAO"
  ;

export type NoteTypes =
  | "ATESTADO_MEDICO"
  | "SEM_JUSTIFICATIVA"
  ;

export type WeekDay =
  | "SEGUNDA"
  | "TERCA"
  | "QUARTA"
  | "QUINTA"
  | "SEXTA"
  | "SABADO"
  | "DOMINGO"
;

export type Role =
  | "admin"
  | "manager"
  | "teacher"
  | "psychologist"
  | "psychology_intern"
  | "social_worker"
  | "social_work_intern"
  ;

export type IdentityType =
  | "CERTIDAO_NASCIMENTO"
  | "CPF"
  | "RG"
  | "CNH"
  | "PASSAPORTE"
  | "TITULO_ELEITOR"
  | "CTPS"
  | "OUTRO"
  ;

export type DocumentType =
  | "COMPROVANTE_RESIDENCIA"
  | "COMPROVANTE_RENDA"
  | "OUTRO"
  ;

export type Level = {
  id: string;
  name: string;
  description: string;
}
  ;

export type CivilState =
  | "SOLTEIRO"
  | "CASADO"
  | "DIVORCIADO"
  | "VIUVO"
  | "UNIAO_ESTAVEL"
  ;
