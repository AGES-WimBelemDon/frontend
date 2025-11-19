import type { FileContentType } from "../../types/fileTypes";
import type { Id } from "../../types/id";

export type Document = {
  id: string;
  studentId: Id;
  originalName: string;
  contentType: FileContentType;
  description: string | null;
  createdAt: string;
  file?: File;
};