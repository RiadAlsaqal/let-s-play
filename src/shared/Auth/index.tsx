import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { createGqlQuery } from "../factory";
import { useLazyQuery } from "../hooks";

export const getToken = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

const AuthContext = createContext<TAuthContext>({
  Auth: "loading",
});
export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = React.useState<TAuth>("loading");
  const [user, setUser] = React.useState<TUser & { balance: number }>();
  const [getMyProfile, { data }] = useLazyQuery<TData>(GET_MY_PROFILE_QUERY);
  const handleAuth = (state: boolean) => setAuth(state);
  const handleUser = (user: TUser, balance: number) => {
    setUser({ ...user, balance });
  };

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
    console.log("auth", userToken);
    if (!!userToken) handleAuth(true);
    else {
      handleAuth(false);
    }
  };
  const providerValue: TAuthContext = {
    Auth: auth,
    deleteToken,
    saveToken,
    user,
    handleUser,
  };

  useEffect(() => {
    checkIfLogin();
    auth === true &&
      getMyProfile().then((e) => {
        const user = e.data?.playerMe.data.edges[0].node;
        handleUser(
          {
            user: {
              email: user?.userId.email as string,
              firstName: user?.userId.firstName as string,
              lastName: user?.userId.lastName as string,
              phone: user?.userId.phone as number,
              pk: user?.pkPlayer as number,
              username: user?.userId.username as string,
            },
          },
          user?.balance as number
        );
      });
  }, [auth]);
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

const GET_MY_PROFILE_QUERY = createGqlQuery(
  `
  query  getMyProfile{
    playerMe{
      data{
        edges{
          node{
            pkPlayer
           userId{
            username
            phone
            firstName
            lastName
            email
          }
          balance
          }
        }
      }
      status
      message
    }
  }
  `
);

type TAuthContext = {
  Auth: TAuth;
  saveToken?: ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => Promise<boolean>;

  deleteToken?: () => Promise<boolean>;
  user?: TUser & { balance: number };
  handleUser?: (user: TUser, balance: number) => void;
};
type TUser = {
  user?: {
    username: string;
    phone: number;
    firstName: string;
    lastName: string;
    email: string;
    pk: number;
  };
};

type TData = {
  playerMe: {
    data: {
      edges: {
        node: {
          pkPlayer: number;
          userId: {
            username: string;
            phone: number;
            firstName: string;
            lastName: string;
            email: string;
          };
          balance: number;
        };
      }[];
    };
  };
};
type TAuth = boolean | "loading";
