import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  ScreenFriends,
  playerScreen,
  FindPlayerOnMap,
  FriendsRequistList,
} from "@src/screens/player/screens/friends";
import { playerProfile } from "@src/screens/player/components";
import { TRootStackFriendsScreenProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackFriendsScreenProps>();

export const FridendsScreenNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Friends"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="players" component={playerScreen} />
      <Stack.Screen name="Friends" component={ScreenFriends} />
      <Stack.Screen name="findPlayerOnMap" component={FindPlayerOnMap} />
      <Stack.Screen name="playerProfile" component={playerProfile} />
      <Stack.Screen name="friendsRequest" component={FriendsRequistList} />
    </Stack.Navigator>
  );
};
