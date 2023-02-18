import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MyText, Button } from "@src/shared/components";
import { Images } from "../../../../../../assets/images";
import { MD3Theme, Surface } from "react-native-paper";
import { withTheme } from "@src/shared/HOC";

const Card: React.FC<TProps> = ({
  data: { firstName, lastName, pk, img },
  theme,
  children,
}) => {
  return (
    <Surface style={style.View}>
      <Image source={img ?? Images.defaultImage} style={style.Image} />
      <View style={style.View2}>
        <MyText style={style.Text}>{firstName}</MyText>
        <MyText style={style.Text}>{lastName}</MyText>
      </View>
      {children}
    </Surface>
  );
};
export const PlayerCard = withTheme(Card);

type TProps = {
  data: TData;
  theme: MD3Theme;
  children?: React.ReactNode;
};

type TData = {
  firstName: string;
  lastName: string;
  img?: string;
  pk: number;
};
const style = StyleSheet.create({
  View: {
    flexDirection: "row",
    margin: 2,
    alignItems: "center",
    justifyContent: "space-between",
    height: 75,
  },
  View2: {
    flexDirection: "row",
    margin: 2,
    alignItems: "center",
    justifyContent: "space-between",
    height: 75,
    width: "40%",
  },
  Text: {
    fontSize: 25,
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
});
