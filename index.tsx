import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SignUp } from "./src/screens/manager/screens";
export default function Index() {
  return (
    <View style={styles.container}>
      <SignUp
        myValues={{
          email: "asd",
          firstName: "asdd",
          lastName: "wqe",
          userName: "jjj",
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
