import React from "react";
import { IconButton } from "react-native-paper";
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
    <Tab.Screen
      name="friends"
      component={FridendsScreenNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <IconButton icon="account" iconColor={color} />
        ),
      }}
    />
    <Tab.Screen
      name="teams"
      component={TeamsScreenNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <IconButton icon="account-group" iconColor={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Clubs"
      component={ClubsScreenNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <IconButton icon="stadium-variant" iconColor={color} />
        ),
      }}
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
