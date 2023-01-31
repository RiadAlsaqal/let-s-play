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
  console.log("authttt", auth);
  const handleAuth = (state: boolean) => setAuth(state);

  const saveToken = useCallback(
    async ({ key, value }: { key: string; value: string }) => {
      console.log("saving");
      return await SecureStore.setItemAsync(key, value)
        .then(() => {
          console.log("saving10");

          handleAuth(true);
          return true;
        })
        .catch((e) => {
          console.log("saving20");

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
  const checkIfLogin = async () => {
    let userToken = await getToken("token");
    if (!!userToken) handleAuth(true);
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
  Auth: boolean;
  saveToken:
    | (({ key, value }: { key: string; value: string }) => Promise<boolean>)
    | undefined;
  deleteToken: ((key: string) => Promise<boolean>) | undefined;
};
