import type { ResponsibleData } from "../../components/NewResponsibleModal/interface";

// O tipo para o estado do formulário de edição
export type ResponsibleFormData = Partial<ResponsibleData>;

export interface EditResponsibleModalProps {
  isOpen?: boolean; // indica se o modal está aberto
  responsibleId: string; // ID do responsável a ser editado
  studentId?: string; // opcional, para referência ao estudante
  onClose: () => void; // callback para fechar o modal
  onSuccess?: () => void; // callback opcional após salvar alterações
}
