import React from "react";
import { TRootStackSettingsScreenProps } from "@src/shared/types";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenSetting } from "@src/screens/player/screens/Settings";
import { UserProfile } from "@src/screens/player/screens/Settings/components";

const Stack = createStackNavigator<TRootStackSettingsScreenProps>();
export const SettingsScreenNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={ScreenSetting} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
