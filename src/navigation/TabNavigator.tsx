import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { IconButton } from "react-native-paper";
import { ClubsScreenNavigation } from "./ClubsScreenNavigation";
import { FridendsScreenNavigation } from "./FridendsScreenNavigation";
import { TeamsScreenNavigation } from "./TeamsScreenNavigation";

const Tab = createBottomTabNavigator();
export const TabBottmNavigation = () => (
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
