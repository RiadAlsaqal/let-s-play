import "react-native-gesture-handler";
import "react-native-gesture-handler";

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
import { LoadingProvider } from "./src/shared/Loading";
import { ErrorBoundryProvider } from "./src/shared/ErrorBoundry";
import { NotificationProvider } from "./src/shared/Notification";
const theme = {
  ...DefaultTheme,
  colors: colors,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ErrorBoundryProvider>
        <ApolloProvider>
          <AuthProvider>
            <LoadingProvider>
              <NotificationProvider>
                <NavigationContainer>
                  <Index />
                </NavigationContainer>
              </NotificationProvider>
            </LoadingProvider>
          </AuthProvider>
        </ApolloProvider>
      </ErrorBoundryProvider>
    </PaperProvider>
  );
}
