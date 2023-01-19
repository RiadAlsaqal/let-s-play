import { useCallback } from "react";
import { debounce } from "lodash";

export const useDebouncer = ({ callback, time }: TArgs) => {
  const debouncer = useCallback(debounce(callback, time), []);
  const handleDebounce = (...args: any) => {
    debouncer.cancel();
    debouncer(...args);
  };
  return { handleDebounce };
};

type TArgs = {
  callback: (...args: any) => void;
  time: number;
};
