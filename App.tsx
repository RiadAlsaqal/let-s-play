import { Provider as PaperProvider } from "react-native-paper";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Index from "./index";

const client = new ApolloClient({
  uri: "https://abdelwahapbak.pythonanywhere.com/graphql",
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
