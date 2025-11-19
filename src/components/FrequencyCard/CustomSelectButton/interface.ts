import { strings } from "../../../constants";
import type { NoteTypes } from "../../../types/filters";

export type NoteOption = {
  value: NoteTypes | "";
  label: string;
};

export interface CustomSelectButtonProps {
  note: NoteTypes | null;
  options: NoteOption[];
  onChange: (value: NoteTypes) => void;
}

export const noteOptions: NoteOption[] = [
  { value: "", label: strings.filters.noteTypes.empty },
  { value: "ATESTADO_MEDICO", label: strings.filters.noteTypes.medical },
  { value: "SEM_JUSTIFICATIVA", label: strings.filters.noteTypes.none },
];
