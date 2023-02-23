import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Navigator } from "./src/navigation";
export default function Index() {
  return (
    <SafeAreaView style={{ height: "96.2%", marginTop: 30 }}>
      <StatusBar style="auto" />

      <Navigator />
    </SafeAreaView>
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
