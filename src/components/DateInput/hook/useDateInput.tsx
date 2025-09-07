import { useEffect} from 'react';

import {useSearchParams } from 'react-router';

export function useDateInput() {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('data', formattedDate);
    setSearchParams(params);
  },[]);

  const setDate = (data: string) => {
    const params = new URLSearchParams();
    params.set('data', data);
    setSearchParams(params);
    console.log(data);
  };

  return{
    setDate,searchParams
  };
}
