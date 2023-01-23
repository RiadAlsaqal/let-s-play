import React, { createContext, useCallback } from "react";

export const AuthContext = createContext<TProviderValue>({
  Auth: false,
  handleAuth: undefined,
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = React.useState(false);
  const handleAuth = useCallback((state: boolean) => setAuth(state), []);
  const providerValue: TProviderValue = {
    Auth: auth,
    handleAuth,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

type TProviderValue = {
  Auth: boolean;
  handleAuth: ((state: boolean) => void) | undefined;
};
