import type { Id } from "../../types/id";

export interface FrequencyCardProps extends FrequencyCardStudent {
  onChangePresence(present: boolean): void
}

export interface FrequencyCardStudent {
  id: Id,
  name: string,
  frequencyPercent: number,
  isPresent: boolean,
}
