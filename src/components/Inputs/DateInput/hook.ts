import { useSearchParams } from "react-router";

import type { InputProps } from "../interface";

export function useDateInput({ id }: InputProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function setDate(data: string) {
    const params = new URLSearchParams(searchParams);
    if (data === "") {
      params.delete(`date${id}`);
    } else {
      params.set(`date${id}`, data);
    }
    setSearchParams(params);
  }

  function getDate(): string {
    const value = searchParams.get(`date${id}`);
    return value ?? "";
  }

  return { setDate, getDate, searchParams };
}
