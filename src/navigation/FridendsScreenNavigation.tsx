import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ScreenFriends,
  playerScreen,
  playerProfile,
} from "@src/screens/player/screens/friends";
import { TRootStackFriendsScreenProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackFriendsScreenProps>();

export const FridendsScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Friends" component={ScreenFriends} />
      <Stack.Screen name="players" component={playerScreen} />
      <Stack.Screen name="playerProfile" component={playerProfile} />
    </Stack.Navigator>
  );
};
