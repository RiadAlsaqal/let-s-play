import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NativeBaseProvider } from "native-base";

import Index from "./index";
const client = new ApolloClient({
  uri: "https://api-dev.application.com",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <Index />
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
