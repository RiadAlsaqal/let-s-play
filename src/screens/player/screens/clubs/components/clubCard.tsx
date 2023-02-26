import React from "react";
import { Image, StyleSheet, View, ImageBackground } from "react-native";
import { Images } from "../../../../../../assets/images";
import { Avatar } from "react-native-paper";
import { MyText } from "@src/shared/components";
export const ClubCard: React.FC<TProps> = ({ name, numberStad, children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
      }}
    >
      <Image
        source={Images.clubsCover}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMethod="scale"
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar.Image source={Images.clubsImage} />
        <View>
          <MyText variant="headlineMedium"> {name}</MyText>
          <MyText variant="labelSmall"> {numberStad} stadiums</MyText>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
        {children}
      </View>
    </View>
  );
};

type TProps = {
  children?: React.ReactElement;
  name: string;
  numberStad: number;
};

const style = StyleSheet.create({
  coverImage: {
    width: "100%",
  },
});
