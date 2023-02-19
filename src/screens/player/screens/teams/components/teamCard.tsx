import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Images } from "../../../../../../assets/images";
import { MyText } from "@src/shared/components";
import { FontAwesome } from "@expo/vector-icons";
import { IconButton, Avatar } from "react-native-paper";
import { TNavigation, TRootStackTeamsScreenProps } from "@src/shared/types";
import { withNavigation } from "@src/shared/HOC";
const TeamCardWithoutNavigation: React.FC<TProps> = ({
  data: { name, teamPk, typeName },
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("teamProfle", {
          teamPk,
        })
      }
    >
      <View style={style.View}>
        <View>
          <Avatar.Image source={Images.defaultImage} />
          <MyText> {typeName}</MyText>
        </View>
        <MyText> {name} </MyText>
        <IconButton icon="arrow-right" />
      </View>
    </TouchableOpacity>
  );
};
export const TeamCard = withNavigation(TeamCardWithoutNavigation);
const style = StyleSheet.create({
  View: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },
});

type TProps = {
  data: { name: string; teamPk: number; image?: string; typeName: string };
  navigation: TNavigation<TRootStackTeamsScreenProps>;
};
