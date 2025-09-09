import { useEffect } from 'react';

import { useSearchParams } from 'react-router';

export function useDateInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  useEffect(function getSearchParam() {
    const params = new URLSearchParams();
    params.set('date', formattedDate);
    setSearchParams(params);
  }, [formattedDate, setSearchParams]);

  function setDate(data: string) {
    const params = new URLSearchParams();
    params.set('date', data);
    setSearchParams(params);
  };

  return { setDate, searchParams };
}
