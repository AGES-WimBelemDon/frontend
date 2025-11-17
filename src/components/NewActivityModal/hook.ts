import { useState } from "react";

import { strings } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { createActivity, updateActivity } from "../../services/activities";
import type { Activity } from "../../types/activities";

export interface ActivityToEdit {
  id: string;
  name: string;
}

export function useNewActivityModal(onSuccess?: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityToEdit | null>(null);

  const { showToast } = useToast();

  function openCreateModal() {
    setEditingActivity(null);
    setIsOpen(true);
  }

  function openEditModal(activity: ActivityToEdit) {
    setEditingActivity(activity);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const activityName = formData.get("activityName")?.toString().trim();

    if (!activityName) return;

    if (editingActivity) {
      await updateActivity(editingActivity.id, { name: activityName });

      showToast(
        strings.newActivityModal.editSuccessToast({ activityName }),
        "success"
      );

      if (onSuccess) onSuccess();
    }

    else {
      if (onSuccess) {
        await onSuccess(); 
      } else {
        await createActivity({ name: activityName } as Omit<Activity, "id">);
      }
    
      showToast(
        strings.newActivityModal.successToast({ activityName }),
        "success"
      );
    }
    

    closeModal();
  }

  return {
    isOpen,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    editingActivity,
  };
}
