import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "@src/shared/hooks";
import { GET_CLUBS } from "../query";
import { withNavigation, withRoute } from "@src/shared/HOC";
import {
  TNavigation,
  RouteProp,
  TLocation,
  TRootStackClubsProps,
} from "@src/shared/types";
import { kMToLatitudes, kMToLongitudes } from "@src/shared/utils";
import { TClube } from "../types";
import { flowRight } from "lodash";
const ClubsMapWithoutRoute: React.FC<TProps> = ({ Route, navigation }) => {
  const { data } = Route.params;
  const ref1 = useRef<any>(null);
  const goToMyLocation = () => {
    setTimeout(
      () =>
        ref1?.current?.animateToRegion(
          {
            latitude:
              data?.length === 1 ? Number(data[0].node.locationLat) : 33.510414,
            longitude:
              data?.length === 1
                ? Number(data[0].node.locationLong)
                : 36.278336,
            latitudeDelta: kMToLatitudes(0.1),
            longitudeDelta: kMToLongitudes(
              100,
              Number(data[0].node.locationLong)
            ),
          },
          3 * 1000
        ),
      3000
    );
  };
  console.log("dataaa", data);
  useEffect(() => goToMyLocation(), []);
  return (
    <View style={style.View}>
      <MapView style={style.map} ref={ref1}>
        {data?.map(({ node: { locationLat, locationLong, pkClub } }) => (
          <Marker
            coordinate={{
              latitude: Number(locationLat),
              longitude: Number(locationLong),
            }}
            onPress={() => {
              navigation.navigate("clubProfile", {
                pk: pkClub,
              });
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export const ClubsMap = flowRight(
  withNavigation,
  withRoute
)(ClubsMapWithoutRoute);
const style = StyleSheet.create({
  View: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

type TProps = {
  Route: RouteProp<TRootStackClubsProps, "clubsMap">;
  navigation: TNavigation<TRootStackClubsProps>;
};
