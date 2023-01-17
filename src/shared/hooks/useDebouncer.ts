import { useCallback } from "react";
import { debounce } from "lodash";

export const useDebouncer = () => {
  const debouncer = useCallback(debounce, []);
  return debouncer;
};
