import type { Id } from "../../types/id";

export interface FrequencyCardProps extends FrequencyCardStudent {
  onChangePresence: (present:FrequencyStatus) => void,
  onChangeNote?: (value: NoteTypes | null) => void;
  isGeneral?: boolean;
}

export const NoteTypes = {
  ATESTADO_MEDICO: "ATESTADO_MEDICO",
  SEM_JUSTIFICATIVA: "SEM_JUSTIFICATIVA"
} as const;

export type NoteTypes = (typeof NoteTypes)[keyof typeof NoteTypes]

export const FrequencyStatus = {
  PRESENTE: "PRESENTE",
  AUSENTE: "AUSENTE"
} as const;

export type FrequencyStatus = (typeof FrequencyStatus)[keyof typeof FrequencyStatus]

export type FrequencyCardStudent = {
  id: Id;
  name: string;
  frequencyPercent: number;
  isPresent: FrequencyStatus;
  notes: NoteTypes | null;
}
