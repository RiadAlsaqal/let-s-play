import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

const AuthContext = createContext<TAuthContext>({
  Auth: "loading",
  deleteToken: undefined,
  saveToken: undefined,
});
export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = React.useState<TAuth>("loading");
  const handleAuth = (state: boolean) => setAuth(state);

  const saveToken = useCallback(
    async ({ key, value }: { key: string; value: string }) => {
      return await SecureStore.setItemAsync(key, value)
        .then(() => {
          handleAuth(true);
          return true;
        })
        .catch((e) => {
          return false;
        });
    },
    []
  );

  const deleteToken = useCallback(async () => {
    let status: boolean = false;

    await SecureStore.deleteItemAsync("token")
      .then(() => {
        handleAuth(false);
        status = true;
      })
      .catch(() => {
        status = false;
      });
    return status;
  }, []);
  const checkIfLogin = async () => {
    let userToken = await getToken("token");
    if (!!userToken) handleAuth(true);
    else {
      handleAuth(false);
    }
  };
  const providerValue: TAuthContext = {
    Auth: auth,
    deleteToken,
    saveToken,
  };

  useEffect(() => {
    checkIfLogin();
  }, []);
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
  Auth: TAuth;
  saveToken:
    | (({ key, value }: { key: string; value: string }) => Promise<boolean>)
    | undefined;
  deleteToken: (() => Promise<boolean>) | undefined;
};

type TAuth = boolean | "loading";
