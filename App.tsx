import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider as PaperProvider } from "react-native-paper";
import Index from "./index";

const client = new ApolloClient({
  uri: "https://api-dev.application.com",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Index />
      </PaperProvider>
    </ApolloProvider>
  );
}
