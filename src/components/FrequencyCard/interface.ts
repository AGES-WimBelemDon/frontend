import type { FrequencyStatus, NoteTypes } from "../../types/filters";
import type { FrequencyCardStudent } from "../../types/frequency";

export interface FrequencyCardProps extends FrequencyCardStudent {
  onChangePresence: (present: FrequencyStatus) => void,
  onChangeNote?: (value: NoteTypes | null) => void;
  isGeneral?: boolean;
}
