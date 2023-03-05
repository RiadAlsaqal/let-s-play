import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { IconButton } from "react-native-paper";
import { ClubsScreenNavigation } from "./ClubsScreenNavigation";
import { FridendsScreenNavigation } from "./FridendsScreenNavigation";
import { ReservationScreenNavigation } from "./ReservationScreenNavigation";
import { TeamsScreenNavigation } from "./TeamsScreenNavigation";
import { NotifecationList } from "@src/screens/player/screens/Notifecation";
const Tab = createBottomTabNavigator();

export const TabBottmNavigation = () => (
  <Tab.Navigator
    initialRouteName="Reservation"
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="Reservation"
      component={ReservationScreenNavigation}
      options={{
        tabBarIcon: ({ color }) => (
          <IconButton icon="receipt" iconColor={color} />
        ),
      }}
    />
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

const Stack = createStackNavigator();

export const TabAndNotifStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tab" component={TabBottmNavigation} />
      <Stack.Screen name="notif" component={NotifecationList} />
    </Stack.Navigator>
  );
};
