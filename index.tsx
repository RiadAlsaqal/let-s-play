import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { ScreenSignUp } from "./src/screens/player/screens/SignUp";
export default function Index() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text>aaa</Text>
      </SafeAreaView>
      <ScreenSignUp />
      {/* <Navigator /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
