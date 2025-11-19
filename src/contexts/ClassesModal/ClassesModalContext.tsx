
import { createContext } from "react";

import type { Classes } from "../../types/classes";

interface ClassesModalContextData {
  isOpen: boolean;
  classData?: Classes;
  openModal: (classData?: Classes) => void;
  closeModal: () => void;
}

export const ClassesModalContext = createContext({} as ClassesModalContextData);
