import { useSearchParams } from "react-router";

import type { InputProps } from "../interface";

export function useSelectInput({ id }: InputProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSelectInput(data: string) {
    const params = new URLSearchParams(searchParams);
    if (data === "") {
      params.delete(`select${id}`);
    } else {
      params.set(`select${id}`, data);
    }
    setSearchParams(params);
  }

  function getSelect(): string {
    const value = searchParams.get(`select${id}`);
    return value ?? "";
  }

  return {
    getSelect,
    setSelectInput,
    searchParams,
  };
}
