import { useState } from "react";

import { useToast } from "../../hooks/useToast";

export function useNewActivityModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const activityName = formData.get("activityName");

    showToast(`Atividade "${activityName}" registrada`, "success");

    closeModal();
  }

  return {
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
  };
}
