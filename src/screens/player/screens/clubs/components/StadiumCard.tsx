import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TGame, MD3Theme } from "@src/shared/types";
import { MyText } from "@src/shared/components";
import { withTheme } from "@src/shared/HOC";
import { Avatar, IconButton, Tooltip } from "react-native-paper";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";
import { TStadium } from "../types";
import { gamesImage } from "../../../../../../assets/gamesImage";
export const StadiumCardPure: React.FC<TProps> = ({
  data: { hasLegua, isAvailable, name, pkStadium, size, type_ },
  theme,
  children,
  styleView,
}) => {
  return (
    <View style={{ ...style.mainVieW, ...styleView }}>
      <Avatar.Image
        source={gamesImage[type_?.name as TGame] as AvatarImageSource}
      />
      <View>
        <MyText variant="labelLarge"> {name}</MyText>
        <MyText variant="labelSmall"> size: {size} players</MyText>
      </View>
      <Tooltip title={isAvailable ? "available" : "not Available"}>
        <IconButton
          size={25}
          icon={isAvailable ? "check" : "close"}
          iconColor={isAvailable ? "green" : "red"}
        />
      </Tooltip>
      {children}
    </View>
  );
};

export const StadiumCard = withTheme(StadiumCardPure);

type TProps = {
  data: TStadium;
  theme: MD3Theme;
  children?: React.ReactElement;
  styleView?: ViewStyle;
};
const style = StyleSheet.create({
  mainVieW: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
