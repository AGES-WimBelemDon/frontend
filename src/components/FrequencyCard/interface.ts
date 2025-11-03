export interface FrequencyCardProps extends FrequencyCardStudent {
  onChangePresence: (present:FrequencyStatus) => void
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
  id: string,
  name: string,
  frequencyPercent: number,
  isPresent: FrequencyStatus,
  notes: NoteTypes
}
