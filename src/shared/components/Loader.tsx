import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loader = () => {
  return (
    <View style={style.View}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
});
