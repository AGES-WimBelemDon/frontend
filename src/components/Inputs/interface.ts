export interface InputProps {
  id: string;
}

export interface SelectInputProps extends InputProps {
  label: string;
  options: string[];
}

export interface TextInputProps extends InputProps {
  label: string;
  placeholder: string;
}
