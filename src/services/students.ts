import { api } from './api';

type Student = {
  id: string;
  name: string;
  frequencyPercent: number;
};

export async function getStudents(): Promise<Student[]> {
  try {
    const response = await api.get<Student[]>('/alunos');
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: (++id).toString(),
          name: 'Leonardo Mallet',
          frequencyPercent: 90,
        },
        {
          id: (++id).toString(),
          name: 'João Pedro',
          frequencyPercent: 60,
        },
        {
          id: (++id).toString(),
          name: 'Pedro Henrique',
          frequencyPercent: 40,
        },
        {
          id: (++id).toString(),
          name: 'Thiago Camargo',
          frequencyPercent: 55,
        },
        {
          id: (++id).toString(),
          name: 'Paulo Camargo',
          frequencyPercent: 55,
        },
        {
          id: (++id).toString(),
          name: 'Mayara Cardi',
          frequencyPercent: 55,
        },
      ],
    });
    return mockResponse.data;
  }
}
