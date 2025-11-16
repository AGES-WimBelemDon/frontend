import { strings } from "../../../constants";
import { NoteTypes } from "../interface";

export type NoteOption = {
value: NoteTypes | string;
label: string;
};

export interface CustomSelectButtonProps {
note: NoteTypes | null;
options: NoteOption[];
onChange: (value: NoteTypes) => void;
}

export const noteOptions: NoteOption[] = [
  { value: "", label: strings.filters.noteTypes.empty },
  { value: NoteTypes.ATESTADO_MEDICO, label: strings.filters.noteTypes.medical },
  { value: NoteTypes.SEM_JUSTIFICATIVA, label: strings.filters.noteTypes.none}
];
