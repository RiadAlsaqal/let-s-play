import React from "react";
import { Avatar, IconButton, Surface } from "react-native-paper";
import {
  RouteProp,
  TSTackReservation,
  TGame,
  TNavigation,
} from "@src/shared/types";
import { withRoute, withNavigation } from "@src/shared/HOC";
import { gamesImage } from "../../../../../../assets/gamesImage";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import { StyleSheet, View } from "react-native";
import { MyText } from "@src/shared/components";
import { flowRight } from "lodash";
const ReservationProfilePure: React.FC<TProps> = ({ Route, navigation }) => {
  const {
    data: {
      node: {
        date,
        kind,
        owner,
        pkReservation,
        durationId: {
          endTime,
          pkDuration,
          price,
          startTime,
          stadium: {
            name,
            pkStadium,
            section: {
              clubId: { locationLat, locationLong, name: clubName, pkClub },
            },
            type_: { name: gameName, pkType },
          },
        },
      },
    },
  } = Route.params;

  return (
    <View style={style.View}>
      <Surface style={style.Surface}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar.Image
            source={gamesImage[gameName as TGame] as AvatarImageSource}
          />
          <MyText style={style.Text} variant="headlineLarge">
            {name}
          </MyText>
          <IconButton
            icon="map-marker-radius"
            size={40}
            onPress={() => {
              navigation.navigate("clubsMap", {
                data: [{ node: { locationLat, locationLong, pkClub } }],
              });
            }}
          />
        </View>
        <MyText variant="headlineMedium" style={style.Text}>
          owner: {owner}
        </MyText>
        <MyText variant="headlineMedium" style={style.Text}>
          club: {clubName}
        </MyText>
        <MyText variant="headlineSmall" style={style.Text}>
          date: {date}
        </MyText>
        <MyText variant="headlineSmall" style={style.Text}>
          time: {startTime + "->" + endTime}
        </MyText>
        <MyText variant="headlineMedium" style={style.Text}>
          price: {price} sp
        </MyText>
      </Surface>
    </View>
  );
};
export const ReservationProfile = flowRight(
  withNavigation,
  withRoute
)(ReservationProfilePure);

const style = StyleSheet.create({
  View: { justifyContent: "center", alignItems: "center" },
  Surface: {
    width: "90%",
    marginTop: 10,
    height: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Text: {
    textAlign: "center",
  },
});

type TProps = {
  Route: RouteProp<TSTackReservation, "ReservationProfle">;
  navigation: TNavigation<TSTackReservation>;
};
