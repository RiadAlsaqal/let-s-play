import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import { colors } from "./src/theme.json";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./src/shared/Auth";
const Stack = createNativeStackNavigator();
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InBsYXllckBsMSIsImV4cCI6MTY3NDU4NzkxNSwib3JpZ0lhdCI6MTY3Mzk4MzExNX0.Qji4sxYEy8pi-WSVBPZG4uup0bnn-PEi5TlyJDgJ4yk`,
    },
  };
});
const client = new ApolloClient({
  uri: "https://abdelwahapbak.pythonanywhere.com/graphql/",
  cache: new InMemoryCache(),
});
const theme = {
  ...DefaultTheme,
  colors: colors,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Index />
          </NavigationContainer>
        </ApolloProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
