import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  RouteProp,
  TRootStackFriendsScreenProps,
  tStatePlayer,
} from "@src/shared/types";
import { withRoute } from "@src/shared/HOC";
import { MyText, Button } from "@src/shared/components";
import { useQuery } from "@src/shared/hooks";
import { Images } from "../../../../assets/images";
import {
  ButtonAcceptFriend,
  ButtonAdd,
  ButtonCansel,
  ButtonRejectFriend,
} from "../screens/friends/components";

const mapStateToButton = (
  pk: number,
  state: tStatePlayer,
  refetch: () => void
) => {
  const config: Record<tStatePlayer, React.ReactElement> = {
    accept: (
      <>
        <ButtonRejectFriend pk={pk} refetch={refetch} />
        <ButtonAcceptFriend pk={pk} refetch={refetch} />
      </>
    ),
    notFriend: <ButtonAdd pk={pk} refetch={refetch} />,
    pending: <ButtonCansel pk={pk} refetch={refetch} />,
    friend: <></>,
  };
  return config[state as keyof typeof config];
};
const User: React.FC<Tprops> = ({ Route }) => {
  const { pk, name, img, state } = Route.params;
  // const {} = useQuery()
  return (
    <View style={style.View}>
      <Image style={style.Image} source={img ?? Images.defaultImage} />
      <MyText> {name} </MyText>
      <View style={style.ButtonView}>
        {mapStateToButton(pk, state, () => {})}
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
