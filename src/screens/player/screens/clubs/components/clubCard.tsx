import React from "react";
import { Image, StyleSheet, View, ImageBackground, Text } from "react-native";
import { Images } from "../../../../../../assets/images";
import { Avatar, Tooltip } from "react-native-paper";
import { MyText } from "@src/shared/components";
export const ClubCard: React.FC<TProps> = ({ name, numberStad, children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        margin: 5,
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
          <Tooltip title={name}>
            <Text style={{ fontSize: 25 }}>
              {name && name.length > 14 ? name.substring(0, 11) + "..." : name}
            </Text>
          </Tooltip>
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
