import { useEffect } from 'react';

import { useSearchParams } from 'react-router';

export function useDateInput(id: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(`date${id}`, formattedDate);
    setSearchParams(params);
  }, []);

  const setDate = (data: string) => {
    const params = new URLSearchParams(searchParams);
    if (data === '') {
      params.delete(`date${id}`);
    } else {
      params.set(`date${id}`, data);
    }
    setSearchParams(params);
  };

  const getDate = (): string => {
    const value = searchParams.get(`date${id}`);
    if (value) {
      return value;
    }
    return '';
  };

  return { setDate, getDate, formattedDate, searchParams };
}
