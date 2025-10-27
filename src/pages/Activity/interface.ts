import type { Activity } from "../../services/activities";

export interface ActivityCardProps { 
  content: Activity
}

export interface ActivityFilterProps {
  name: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
}
