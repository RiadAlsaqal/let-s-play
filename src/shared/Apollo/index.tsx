import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Apollo,
  createHttpLink,
  useApolloClient,
} from "@apollo/client";
import { getToken } from "../Auth";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
const httpLink = createUploadLink({
  uri: "http://192.168.43.205:8000/graphql/",
});
const authLink = setContext(async (_, { headers }) => {
  const token = await getToken("token");
  return {
    headers: {
      ...headers,
      authorization: Boolean(token) ? `${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<TApolloProvider> = ({ children }) => {
  return (
    <>
      <Apollo client={client}>{children}</Apollo>
    </>
  );
};

export const useClient = () => {
  const client = useApolloClient();
  return client;
};
type TApolloProvider = {
  children: React.ReactElement;
};
