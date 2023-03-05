import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabAndNotifStack } from "./TabNavigator";
import { SettingsScreenNavigation } from "./SettingsScreenNavigation";
import { HeaderComponent } from "./HeaderComponent";
const Drawer = createDrawerNavigator();

export const AuthScreens = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: (props) => {
          return <HeaderComponent props={props} />;
        },
      }}
    >
      <Drawer.Screen name="Home" component={TabAndNotifStack} />
      <Drawer.Screen name="Setting" component={SettingsScreenNavigation} />
    </Drawer.Navigator>
  );
};
