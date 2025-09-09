import { api } from './api';

type Activity = {
  id: string;
  title: string;
};

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>('/atividades');
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        { id: (++id).toString(), title: 'Chamada Geral' },
        { id: (++id).toString(), title: 'Tênis' },
        { id: (++id).toString(), title: 'Hidroginástica' },
        { id: (++id).toString(), title: 'Natação' },
        { id: (++id).toString(), title: 'Musculação' },
        { id: (++id).toString(), title: 'Spinning' },
        { id: (++id).toString(), title: 'Jump' },
        { id: (++id).toString(), title: 'Alongamento' },
        { id: (++id).toString(), title: 'Pilates' },
        { id: (++id).toString(), title: 'Yoga' },
        { id: (++id).toString(), title: 'Zumba' },
      ],
    });
    return mockResponse.data;
  }
}
