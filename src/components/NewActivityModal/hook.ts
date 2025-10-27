import { useState } from "react";

import { strings } from "../../constants";
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
    const activityNameField = formData.get("activityName")
    const activityName = activityNameField?.valueOf().toString().trim();

    if (!activityName) {
      return;
    }

    showToast(strings.newActivityModal.successToast({ activityName }), "success");

    closeModal();
  }

  return {
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
  };
}
