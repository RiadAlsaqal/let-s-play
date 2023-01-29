import React from "react";

import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./index";
import { colors } from "./src/theme.json";
import { AuthProvider } from "./src/shared/Auth";
import { ApolloProvider } from "./src/shared/Apollo";

const theme = {
  ...DefaultTheme,
  colors: colors,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <ApolloProvider>
          <NavigationContainer>
            <Index />
          </NavigationContainer>
        </ApolloProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
