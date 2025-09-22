import { api } from './api';
import type { Activity } from '../pages/Activity/ActivityList/interface';

export async function getActivities(): Promise<Activity[]> {
  try {
    const response = await api.get<Activity[]>("/atividades");
    return response.data;
  } catch {
    // TODO: This should only work for development, remove in production
    let id = 0;
    const mockResponse = await Promise.resolve({
      data: [
        {
          id: ++id,
          name: 'Chamada Geral',
          teacher: 'Professor Mestre',
          area: 'Esportes',
          frequency: 'Diária',
        },
        {
          id: ++id,
          name: 'Tênis',
          teacher: 'Professor de Tênis',
          area: 'Esportes',
          frequency: 'Semanal',
        },
        {
          id: ++id,
          name: 'Hidroginástica',
          teacher: 'Professor de Hidroginástica',
          area: 'Aquáticos',
          frequency: 'Mensal',
        },
        {
          id: ++id,
          name: 'Natação',
          teacher: 'Professor de Natação',
          area: 'Aquáticos',
          frequency: 'Semanal',
        },
        {
          id: ++id,
          name: 'Musculação',
          teacher: 'Professor de Musculação',
          area: 'Academia',
          frequency: 'Diária',
        },
        {
          id: ++id,
          name: 'Spinning',
          teacher: 'Professor de Spinning',
          area: 'Academia',
          frequency: 'Semanal',
        },
      ],
    });
    return mockResponse.data;
  }
}