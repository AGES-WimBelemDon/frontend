export interface NewActivityModalProps {
  isOpen: boolean;
  closeModal(): void;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
};
