import React from "react";
import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

export const myButton: React.FC<ButtonProps> = (props) => {
  return <Button mode="contained" {...props} />;
};
