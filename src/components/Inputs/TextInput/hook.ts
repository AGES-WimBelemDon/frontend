import { useSearchParams } from 'react-router';

export function useTextInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setText = (data: string, id: string) => {
    const params = new URLSearchParams(searchParams);
    if (data === '') {
      params.delete(`text${id}`);
    } else {
      params.set(`text${id}`, data);
    }
    setSearchParams(params);
  };

  const getText = (id: string) => {
    const value = searchParams.get(`text${id}`);
    if (value) {
      return value;
    }
    return '';
  };

  return { setText, getText, searchParams };
}
