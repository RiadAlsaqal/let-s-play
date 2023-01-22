import React, { createContext } from "react";

const AuthContext = createContext<boolean>(false);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(false);
  const providerValue = {
    Auth: auth,
  };
  return <AuthContext></AuthContext>;
};
