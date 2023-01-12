import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./index";
import { SignUp } from "./src/screens/manager/screens";
import { Navigator } from "./src/navigation";
import { colors } from "./src/theme.json";
const Stack = createNativeStackNavigator();

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
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
