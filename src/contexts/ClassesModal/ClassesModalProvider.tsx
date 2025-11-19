import { useState } from "react";

import { ClassesModalContext } from "./ClassesModalContext";
import type { Classes } from "../../types/classes";

export function ClassesModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [classData, setClassData] = useState<Classes | undefined>(undefined);

  function openModal(data?: Classes) {
    if (data) {
      setClassData(data);
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setClassData(undefined);
  }

  return (
    <ClassesModalContext.Provider
      value={{
        isOpen,
        classData,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ClassesModalContext.Provider>
  );
}
