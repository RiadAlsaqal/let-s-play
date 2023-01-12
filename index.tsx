import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Navigator } from "./src/navigation";
export default function Index() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text>asd</Text>
      </SafeAreaView>
      <Navigator />
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
