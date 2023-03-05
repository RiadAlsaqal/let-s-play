import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Surface } from "react-native-paper";
import { TReservation } from "../types";
import { gamesImage } from "../../../../../../assets/gamesImage";
import { TGame } from "@src/shared/types";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import { MyText } from "@src/shared/components";
export const ReservationCard: React.FC<TProps> = ({
  data: {
    node: { date, durationId, kind, owner, pkReservation },
  },
  children,
}) => {
  return (
    <Surface>
      <View style={style.View}>
        <Avatar.Image
          source={
            gamesImage[
              durationId.stadium.type_.name as TGame
            ] as AvatarImageSource
          }
        />
        <View>
          <MyText variant="bodyLarge"> {durationId.stadium.name}</MyText>
          <MyText variant="bodyMedium"> {date} </MyText>
        </View>
        <View>
          <MyText>owner </MyText>
          <MyText>{owner} </MyText>
        </View>
        {children}
      </View>
    </Surface>
  );
};

const style = StyleSheet.create({
  View: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

type TProps = {
  data: TReservation;
  children?: React.ReactElement;
};
