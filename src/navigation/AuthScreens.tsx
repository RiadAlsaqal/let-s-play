import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenClube } from "@src/screens/player/screens/clubs";
import { ScreenSetting } from "@src/screens/player/screens/Settings";
const Tab = createBottomTabNavigator();

export const AuthScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Setting" component={ScreenSetting} />
      <Tab.Screen name="Clubs" component={ScreenClube} />
    </Tab.Navigator>
  );
};
