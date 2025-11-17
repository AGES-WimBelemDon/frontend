import type { Activity } from "../../types/activities";

export interface ActivityCardProps { 
  content: Activity
  onEdit?: () => void;
}

export interface ActivityFilterProps {
  name: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
}
