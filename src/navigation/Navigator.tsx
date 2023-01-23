import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp } from "@src/screens/player";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
