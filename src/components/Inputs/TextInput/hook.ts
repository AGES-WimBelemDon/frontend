import { useSearchParams } from 'react-router';

export function useTextInput(id: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setTextInput = (data: string) => {
    const params = new URLSearchParams(searchParams);
    if (data === '') {
      params.delete(`text${id}`);
    } else {
      params.set(`text${id}`, data);
    }
    setSearchParams(params);
  };

  const getTextInput = () => {
    const value = searchParams.get(`text${id}`);
    if (value) {
      return value;
    }
    return '';
  };

  return { setTextInput, getTextInput, searchParams };
}
