import type { FilterOption } from "../../../hooks/useFilters";

export interface SelectInputProps<T> {
  label: string;
  options: FilterOption<T>[] | undefined;
  id: string;
  placeholder?: string;
}
