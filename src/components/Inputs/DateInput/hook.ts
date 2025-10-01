import { useSearchParams } from "react-router";

export function useDateInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setDate = (data: string, id: string) => {
    const params = new URLSearchParams(searchParams);
    if (data === "") {
      params.delete(`date${id}`);
    } else {
      params.set(`date${id}`, data);
    }
    setSearchParams(params);
  };

  const getDate = (id: string): string => {
    const value = searchParams.get(`date${id}`);
    if (value) {
      return value;
    }
    return "";
  };

  return { setDate, getDate, searchParams };
}
