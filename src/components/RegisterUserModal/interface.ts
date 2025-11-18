import type { Id } from "../../types/id";

export type RegisterUserFormValues = {
  name: string;
  email: string;
  role?: string;
};

export interface RegisterUserModalProps {
  isOpen: boolean;
  closeModal(): void;
  initialValues?: Partial<RegisterUserFormValues & { id?: Id }>;
}
