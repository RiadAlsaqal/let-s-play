import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "../components";
import { withTheme } from "../HOC";

const ErrorBoundryContext = createContext<TErrorBoundryContext>(undefined);

const SnackbarWithTheme = withTheme(Snackbar);

export const ErrorBoundryProvider: React.FC<TErrorBoundry> = ({ children }) => {
  const [error, setError] = useState<TErrorBoundeyState>(undefined);

  const handleOnDismiss = () => {
    setError(undefined);
  };
  const handelSetError = useCallback((error: string) => {
    setError(error);
  }, []);

  return (
    <ErrorBoundryContext.Provider value={handelSetError}>
      {children}
      <SnackbarWithTheme visible={!!error} onDismiss={handleOnDismiss}>
        {error as string}
      </SnackbarWithTheme>
    </ErrorBoundryContext.Provider>
  );
};

export const useErrorBoundry = () => {
  const handelSetError = useContext(ErrorBoundryContext);
  return handelSetError;
};

type TErrorBoundeyState = string | undefined;

type TErrorBoundryContext = ((error: string) => void) | undefined;

type TErrorBoundry = {
  children: React.ReactElement;
};
