import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenSetting } from "@src/screens/player/screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { FridendsScreenNavigation } from "./FridendsScreenNavigation";
import { TeamsScreenNavigation } from "./TeamsScreenNavigation";
import { ClubsScreenNavigation } from "./ClubsScreenNavigation";
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TabBottmNavigation = () => (
  <Tab.Navigator
    initialRouteName="Clubs"
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="friends" component={FridendsScreenNavigation} />
    <Tab.Screen name="teams" component={TeamsScreenNavigation} />
    <Tab.Screen
      name="Clubs"
      component={ClubsScreenNavigation}
      options={{ tabBarBadge: 3 }}
    />
  </Tab.Navigator>
);
export const AuthScreens = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabBottmNavigation} />
      <Drawer.Screen name="Setting" component={ScreenSetting} />
    </Drawer.Navigator>
  );
};
