import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { RouteProp, TRootStackFriendsScreenProps } from "@src/shared/types";
import { withRoute } from "@src/shared/HOC";
import { MyText, Button } from "@src/shared/components";
import { Images } from "../../../../../../assets/images";
const User: React.FC<Tprops> = ({ Route }) => {
  const { pk, name, img } = Route.params;
  return (
    <View style={style.View}>
      <Image style={style.Image} source={img ?? Images.defaultImage} />
      <MyText> {name} </MyText>
      <View style={style.ButtonView}>
        <Button> remove </Button>
        <Button> message </Button>
      </View>
    </View>
  );
};
export const playerProfile = withRoute(User);
const style = StyleSheet.create({
  View: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  ButtonView: {
    flexDirection: "row",
  },
});

type Tprops = {
  Route: RouteProp<TRootStackFriendsScreenProps, "playerProfile">;
};
