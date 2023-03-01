import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabBottmNavigation } from "./TabNavigator";
import { SettingsScreenNavigation } from "./SettingsScreenNavigation";
const Drawer = createDrawerNavigator();

export const AuthScreens = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabBottmNavigation} />
      <Drawer.Screen name="Setting" component={SettingsScreenNavigation} />
    </Drawer.Navigator>
  );
};
