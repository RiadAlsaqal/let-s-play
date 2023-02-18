import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Teams, CreateTeamForm } from "@src/screens/player/screens/teams";
import { TRootStackTeamsScreenProps } from "@src/shared/types";
const Stack = createStackNavigator<TRootStackTeamsScreenProps>();

export const TeamsScreenNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="teams" component={Teams} />
      <Stack.Screen name="createTeam" component={CreateTeamForm} />
    </Stack.Navigator>
  );
};
