import type { ResponsibleData } from "../../components/NewResponsibleModal/interface";

export type ResponsibleFormData = Partial<ResponsibleData>;

export interface EditResponsibleModalProps {
  isOpen?: boolean;
  responsibleId: string;
  studentId?: string; 
  onClose: () => void; 
  onSuccess?: () => void; 
}