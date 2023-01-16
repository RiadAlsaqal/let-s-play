import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

export const myButton: React.FC<Omit<ButtonProps, "theme">> = (props) => {
  const theme = useTheme();
  return <Button mode="contained" {...props} theme={theme} />;
};
