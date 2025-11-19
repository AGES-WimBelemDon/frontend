import { api, endpoints } from "./api";
import type {
  CreateStudentFile,
  FileContentType,
  StudentFile,
  UploadResponse,
} from "../types/fileTypes";

export async function addStudentDocument<UploadResponse>(
  documentData: CreateStudentFile
): Promise<UploadResponse> {
  try {
    // delete documentData.file;
    const result = await api.post<UploadResponse>(
      `${endpoints.documents.generatePreUpload}`,
      documentData
    );

    return result.data;
  } catch {
    throw new Error("Error on servicesAddStudentDocument");
  }
}

export async function addDocumentInFirebase(
  uploadResponse: UploadResponse,
  file: File,
  fileType: FileContentType
) {
  try {
    if (uploadResponse.url == "") {
      return;
    }

    const result = await fetch(uploadResponse.url, {
      method: "PUT",
      headers: {
        "Content-Type": fileType,
      },
      body: file,
    });

    return result;
  } catch {
    throw new Error("Error on servicesAddDocumentInFirebase");
  }
}

export async function confirmUpload(fileId: string) {
  try {
    await api.post(`${endpoints.documents.confirmUpload}`, { fileId });
  } catch {
    throw new Error("Error on servicesAddDocumentInFirebase");
  }
}

export async function getDocumentByStudent(
  studentId: string
): Promise<StudentFile[]> {
  try {
    const result = await api.get<StudentFile[]>(
      `${endpoints.documents.getDocumentsByStudent(studentId)}`
    );

    return result.data;
  } catch {
    throw new Error("Error on getDocumentByStudent");
  }
}

export async function downloadDocumentsIndividually(documents: StudentFile[]) {
  for (const doc of documents) {
    const response = await fetch(doc.url);
    const blob = await response.blob();

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = doc.originalName || "arquivo";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(a.href);
  }
}
