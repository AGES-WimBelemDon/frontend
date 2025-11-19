import type { Id } from "./id";

export const FileContentType = {
  JPEG: "image/jpeg",
  PNG: "image/png",
  GIF: "image/gif",
  WEBP: "image/webp",
  SVG: "image/svg+xml",
  PDF: "application/pdf",
  TEXT: "text/plain",
  CSV: "text/csv",
  ZIP: "application/zip",
} as const;

export type FileContentType = typeof FileContentType[keyof typeof FileContentType];

export type CreateStudentFile = {
  studentId: Id;
  originalName: string;
  contentType: FileContentType;
  description: string | null;
  createdAt: string;
  file?: File; 
};

export type UploadResponse = {
  documentId: string,
  url: string
}

export type StudentFile = {
  id: Id;
  studentId: Id;
  originalName: string;
  contentType: FileContentType;
  description: string | null;
  createdAt: string;
  url: string;
};
