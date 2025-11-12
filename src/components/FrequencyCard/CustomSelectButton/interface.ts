import { NoteTypes } from "../interface";

export type NoteOption = {
value: NoteTypes;
label: string;
};

export interface CustomSelectButtonProps {
note: NoteTypes | null;
options: NoteOption[];
onChange: (value: NoteTypes) => void;
}

export const noteOptions: NoteOption[] = [
  { value: NoteTypes.ATESTADO_MEDICO, label: "Atestado Médico" },
  { value: NoteTypes.SEM_JUSTIFICATIVA, label: "Sem Justificativa" }
];
