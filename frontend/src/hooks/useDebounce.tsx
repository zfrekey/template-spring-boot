import { useEffect, useState } from "react";

/**
 * Retorna o valor somente depois do tempo definido em `delay` sem mudanças.
 * 
 * @param value Valor que será "debounced"
 * @param delay Tempo em ms para esperar (padrão: 300ms)
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}