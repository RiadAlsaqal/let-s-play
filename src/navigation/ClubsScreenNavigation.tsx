import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ClubsMap,
  ClubsScreen,
  ClubProfile,
  StadiumProfile,
} from "../screens/player/screens/clubs";
import { TRootStackClubsProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackClubsProps>();
export const ClubsScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="clubs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="clubs" component={ClubsScreen} />
      <Stack.Screen name="clubsMap" component={ClubsMap} />
      <Stack.Screen name="clubProfile" component={ClubProfile} />
      <Stack.Screen name="stadiumProfile" component={StadiumProfile} />
    </Stack.Navigator>
  );
};
