import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { X } from "./src/screens/manager/screens";
export default function Index() {
  return (
    <View style={styles.container}>
      <X /> <StatusBar style="auto" />
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
