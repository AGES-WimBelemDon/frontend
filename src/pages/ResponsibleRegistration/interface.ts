export const wbGreen = '#9AC77A';
export const wbTeal = '#167A7A';

export interface InfoLineProps {
  label: string;
  value: string | number;
}

export type Responsible = {
  id: string;
  nome: string;
  cpf: string;
  nascimento: string;
  estadoCivil: string;
  nis: string;
  telefone: string;
  email: string;
  endereco: string;
};

export interface ResponsibleCardProps {
  data: Responsible;
  onEdit: (id: string) => void;
}
