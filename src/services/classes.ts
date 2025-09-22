import { api } from "./api";

type Class = {
  id: string;
  title: string;
};

export async function getClasses(): Promise<Class[]> {
  try {
    const response = await api.get<Class[]>("/turmas");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        { id: (++id).toString(), title: "Turma 10" },
        { id: (++id).toString(), title: "Turma 11" },
        { id: (++id).toString(), title: "Turma 12" },
        { id: (++id).toString(), title: "Turma 23" },
        { id: (++id).toString(), title: "Turma 24" },
        { id: (++id).toString(), title: "Turma 25" },
        { id: (++id).toString(), title: "Turma 36" },
        { id: (++id).toString(), title: "Turma 37" },
        { id: (++id).toString(), title: "Turma 38" },
      ],
    });
    return mockResponse.data;
  }
}
