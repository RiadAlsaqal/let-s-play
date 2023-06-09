import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { withRoute, withNavigation } from "@src/shared/HOC";
import {
  RouteProp,
  TRootStackFriendsScreenProps,
  tStatePlayer,
  TNavigation,
  TLocation,
} from "@src/shared/types";
import { Button } from "@src/shared/components";
import { useLazyQuery } from "@src/shared/hooks";
import { FIND_PLAYER_ON_MAP } from "../querys";
export const PlayersOnMap: React.FC<TProps> = ({ Route, navigation }) => {
  const { myLocation } = Route.params;
  const [location, setLocation] = useState(myLocation);
  const [getPlayers, { data }] = useLazyQuery<TResponse>(FIND_PLAYER_ON_MAP);
  const ref1 = useRef<any>(null);
  const goToMyLocation = (location: TLocation) => {
    setTimeout(() => ref1?.current?.animateToRegion(location, 3 * 1000), 3000);
  };
  useEffect(() => goToMyLocation(myLocation), []);
  return (
    <View style={style.View}>
      <MapView style={style.map} ref={ref1} onRegionChange={setLocation}>
        <Circle
          center={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          radius={1000}
          strokeColor="red"
          fillColor="rgba(239,144,144,.1)"
        />
        {data?.findPlayerOnMap.data.edges.map(
          ({ node: { locationLat, locationLong, pkPlayer } }) => (
            <Marker
              coordinate={{
                latitude: Number(locationLat),
                longitude: Number(locationLong),
              }}
              onPress={() => {
                navigation.navigate("playerProfile", {
                  pk: pkPlayer,
                });
              }}
            />
          )
        )}
      </MapView>
      <Button
        onPress={() =>
          getPlayers({
            variables: {
              lat: location.latitude,
              lon: location.longitude,
              distance: 1,
            },
          })
        }
      >
        get players
      </Button>
    </View>
  );
};
export const FindPlayerOnMap = withRoute(PlayersOnMap);
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
  Route: RouteProp<TRootStackFriendsScreenProps, "findPlayerOnMap">;
  navigation: TNavigation<TRootStackFriendsScreenProps>;
};

type TResponse = {
  findPlayerOnMap: {
    data: {
      edges: TNode[];
    };
  };
};

type TNode = {
  node: {
    pkPlayer: number;
    state: tStatePlayer;
    locationLat: string;
    locationLong: string;
    userId: {
      firstName: string;
      lastName: string;
    };
  };
};
