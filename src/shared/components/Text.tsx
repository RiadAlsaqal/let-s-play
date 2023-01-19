import React from "react";
import { Text, TextProps } from "react-native-paper";
import { withTheme } from "../HOC";
const TextNoTheme: React.FC<TextProps> = (props) => {
  return <Text {...props} />;
};

export const MyText = withTheme(TextNoTheme);
