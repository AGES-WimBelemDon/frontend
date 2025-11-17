export interface NewActivityModalProps {
  isOpen: boolean;
  closeModal(): void;
  editingActivity: { id: string; name: string } | null;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
};
