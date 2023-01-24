import React, { createContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Apollo,
  createHttpLink,
} from "@apollo/client";
import { getToken } from "../Auth";
import { setContext } from "@apollo/client/link/context";
const httpLink = createHttpLink({
  uri: "https://abdelwahapbak.pythonanywhere.com/graphql/",
});
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken("token");
  return {
    headers: {
      ...headers,
      token: Boolean(token) ? `${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<TApolloProvider> = ({ children }) => {
  return (
    <ApolloProvider>
      <Apollo client={client}>{children}</Apollo>
    </ApolloProvider>
  );
};

type TApolloProvider = {
  children: React.ReactElement;
};
