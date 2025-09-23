import type { Option } from "../../services/select-options";

export interface InputProps {
  id: string;
}

export interface SelectInputProps extends InputProps {
  label: string;
  options: Option[];
}

export interface TextInputProps extends InputProps {
  label: string;
  placeholder: string;
  type?: string;
}
