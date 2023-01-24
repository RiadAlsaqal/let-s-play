import React, { createContext, useCallback, useContext } from "react";
import * as SecureStore from "expo-secure-store";

export const getToken = (() => {
  let token: string | null = null;
  return async (key: string) => {
    if (!Boolean(token)) {
      token = await SecureStore.getItemAsync(key);
      return token;
    }
    return token;
  };
})();

const AuthContext = createContext<TAuthContext>({
  Auth: false,
  deleteToken: undefined,
  saveToken: undefined,
});
export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = React.useState(false);
  const handleAuth = (state: boolean) => setAuth(state);

  const saveToken = useCallback(
    async ({ key, value }: { key: string; value: string }) => {
      return await SecureStore.setItemAsync(key, value)
        .then(() => {
          handleAuth(true);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    []
  );

  const deleteToken = useCallback(async (key: string) => {
    let status: boolean = false;

    await SecureStore.deleteItemAsync(key)
      .then(() => {
        handleAuth(false);
        status = true;
      })
      .catch(() => {
        status = false;
      });
    return status;
  }, []);
  const providerValue: TAuthContext = {
    Auth: auth,
    deleteToken,
    saveToken,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};

type TAuthContext = {
  Auth: boolean;
  saveToken:
    | (({ key, value }: { key: string; value: string }) => Promise<boolean>)
    | undefined;
  deleteToken: ((key: string) => Promise<boolean>) | undefined;
};
