import { api } from './api';

type TechDemo = {
    id: string;
    full_name: string;
    description: string;
    subscribers_count: number;
    stargazers_count: number;
    forks_count: number;
};

export async function getTechDemo(): Promise<TechDemo> {
  // Needs VITE_API_URL to be https://api.github.com
  const response = await api.get<TechDemo>('/repos/tanstack/query');
  return response.data;
}
