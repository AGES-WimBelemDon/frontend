import { useCallback, useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router";

import type { InputProps } from "../interface";

export function useTextInput({ id }: InputProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTextParam = useCallback(function getTextParam() {
    const value = searchParams.get(`text-${id}`);
    return value ?? "";
  }, [id, searchParams]);

  useEffect(function setTextParamsFromURL() {
    setText(getTextParam());
  }, [searchParams, getTextParam]);

  useEffect(function syncTextParam() {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(function updateTextParam() {
      const params = new URLSearchParams(searchParams);
      if (text === "") {
        params.delete(`text-${id}`);
      } else {
        params.set(`text-${id}`, text);
      }
      setSearchParams(params);
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [id, text, searchParams, setSearchParams]);

  return { text, getTextParam, setText };
}
