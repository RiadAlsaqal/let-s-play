import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { Avatar, Divider, Surface } from "react-native-paper";
import { useAuth } from "@src/shared/Auth";
import { Images } from "../../../../../../assets/images";
import { MyText } from "@src/shared/components";

export const UserProfile = () => {
  const { user: data } = useAuth();
  const user = data?.user;
  const balance = data?.balance;
  return (
    <View style={style.View}>
      {user?.pk && (
        <View style={style.userView}>
          <Avatar.Image
            source={Images.defaultImage}
            style={{ marginRight: 30, marginLeft: 30 }}
          />
          <Divider />
          <View>
            <MyText variant="headlineLarge">
              {user.firstName} {user.lastName}
            </MyText>
            <MyText variant="labelLarge">username: {user.username}</MyText>
            <MyText variant="labelLarge">email: {user.email}</MyText>
            <MyText variant="labelLarge">balance: {balance} SP</MyText>
          </View>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    marginTop: 40,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  userView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    width: "100%",
  },
});
