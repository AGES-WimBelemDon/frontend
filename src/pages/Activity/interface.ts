import type { Activity } from "../../types/activities";

export interface ActivityCardProps { 
  content: Activity
}

export interface ActivityFilterProps {
  name: string;
  onNameChange: React.Dispatch<React.SetStateAction<string>>;
}
