import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  Teams,
  CreateTeamForm,
  TeamProfile,
} from "@src/screens/player/screens/teams";
import { playerProfile } from "@src/screens/player/components";
import { TRootStackTeamsScreenProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackTeamsScreenProps>();

export const TeamsScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="teams" component={Teams} />
      <Stack.Screen name="createTeam" component={CreateTeamForm} />
      <Stack.Screen name="teamProfle" component={TeamProfile} />
      <Stack.Screen name="playerProfile" component={playerProfile} />
    </Stack.Navigator>
  );
};
