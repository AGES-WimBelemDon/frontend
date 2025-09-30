import { useSearchParams } from "react-router";

export function useSelectInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSelectInput = (data: string, id: string) => {
    const params = new URLSearchParams(searchParams);
    if (data === "") {
      params.delete(`select${id}`);
    } else {
      params.set(`select${id}`, data);
    }
    setSearchParams(params);
  };

  const getSelect = (id: string): string => {
    const value = searchParams.get(`select${id}`);
    if (value) {
      return value;
    }
    return "";
  };

  return {
    getSelect,
    setSelectInput,
    searchParams,
  };
}
