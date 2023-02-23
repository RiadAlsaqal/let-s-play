import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { IconButton } from "react-native-paper";
import { withNavigation } from "@src/shared/HOC";
import { TNavigation, TRootStackFriendsScreenProps } from "@src/shared/types";

const infoButton: React.FC<TProps> = ({ name, navigation, pk }) => {
  console.log("pkkk", pk);
  return (
    <IconButton
      onPress={() => {
        navigation.navigate("playerProfile", {
          pk,
        });
      }}
      mode="contained-tonal"
      icon={() => <AntDesign size={30} name="info" />}
    />
  );
};

export const ButtonInfo = withNavigation(infoButton);

type TProps = {
  name: string;
  navigation: TNavigation<TRootStackFriendsScreenProps>;
  pk: number;
};
