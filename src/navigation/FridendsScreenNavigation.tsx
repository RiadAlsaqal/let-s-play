import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ScreenFriends,
  playerScreen,
  FindPlayerOnMap,
} from "@src/screens/player/screens/friends";
import { playerProfile } from "@src/screens/player/components";
import { TRootStackFriendsScreenProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackFriendsScreenProps>();

export const FridendsScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Friends" component={ScreenFriends} />
      <Stack.Screen name="findPlayerOnMap" component={FindPlayerOnMap} />

      <Stack.Screen name="players" component={playerScreen} />
      <Stack.Screen name="playerProfile" component={playerProfile} />
    </Stack.Navigator>
  );
};
