import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenClube } from "@src/screens/player/screens/clubs";
import { ScreenSetting } from "@src/screens/player/screens/Settings";
import { FridendsScreenNavigation } from "./FridendsScreenNavigation";
const Tab = createBottomTabNavigator();

export const AuthScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Setting"
        component={ScreenSetting}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="friends" component={FridendsScreenNavigation} />

      <Tab.Screen
        name="Clubs"
        component={ScreenClube}
        options={{ tabBarBadge: 3 }}
      />
    </Tab.Navigator>
  );
};
