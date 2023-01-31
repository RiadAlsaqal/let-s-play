import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenClube } from "@src/screens/player/screens/clubs";
const Tab = createBottomTabNavigator();

export const AuthScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hi" component={ScreenClube} />
    </Tab.Navigator>
  );
};
