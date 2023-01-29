import React from "react";
import { ScreenSignUp, ScreenLogIn } from "@src/screens/player";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export const NotAuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn" component={ScreenLogIn} />
      <Stack.Screen name="SignUp" component={ScreenSignUp} />
    </Stack.Navigator>
  );
};
