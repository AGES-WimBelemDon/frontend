export type ClassesModalData = {
  activity: string;
  level: string;
  periodicity: string;
  date: string;
  active: string;
}

export interface FilterProps {
  label: string;
  name: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
