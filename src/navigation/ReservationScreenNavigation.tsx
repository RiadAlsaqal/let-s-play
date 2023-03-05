import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ReservationScreen,
  ReservationProfile,
} from "@src/screens/player/screens/Reservation";
import {
  TRootStackReservationScreenProps,
  TSTackReservation,
  RouteProp,
} from "@src/shared/types";
import { createStackNavigator } from "@react-navigation/stack";
import { withRoute } from "@src/shared/HOC";
import { ClubsMap } from "@src/screens/player/components";
const Tab = createMaterialTopTabNavigator<TRootStackReservationScreenProps>();

const Stack = createStackNavigator<TSTackReservation>();

const ReservationStackPure: React.FC<TStackProps> = ({ Route }) => {
  const { team } = Route.params;
  return (
    <Stack.Navigator
      initialRouteName="reservation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="reservation"
        component={ReservationScreen}
        initialParams={{ team }}
      />
      <Stack.Screen name="ReservationProfle" component={ReservationProfile} />
      <Stack.Screen name="clubsMap" component={ClubsMap} />
    </Stack.Navigator>
  );
};

const ReservationStack = withRoute(ReservationStackPure);
export const ReservationScreenNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="myReservation"
        component={ReservationStack}
        initialParams={{ team: false }}
        options={{ tabBarLabel: "my reservations" }}
      />
      <Tab.Screen
        name="teamReservation"
        component={ReservationStack}
        initialParams={{ team: true }}
        options={{ tabBarLabel: "teams reservations" }}
      />
    </Tab.Navigator>
  );
};

type TStackProps = {
  Route: RouteProp<
    TRootStackReservationScreenProps,
    "myReservation" | "teamReservation"
  >;
};
