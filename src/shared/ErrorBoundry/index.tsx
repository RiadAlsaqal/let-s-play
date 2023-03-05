import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "../components";
import { withTheme } from "../HOC";

const ErrorBoundryContext = createContext<TErrorBoundryContext>(undefined);

const SnackbarWithTheme = withTheme(Snackbar);

export const ErrorBoundryProvider: React.FC<TErrorBoundry> = ({ children }) => {
  const [message, setMessage] = useState<TErrorBoundeyState>(undefined);

  const handleOnDismiss = () => {
    setMessage(undefined);
  };
  const handelSetError = useCallback((error: string) => {
    setMessage(error);
  }, []);

  return (
    <ErrorBoundryContext.Provider value={handelSetError}>
      {children}
      <SnackbarWithTheme
        visible={!!message}
        onDismiss={handleOnDismiss}
        duration={3 * 1000}
      >
        {message as string}
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
