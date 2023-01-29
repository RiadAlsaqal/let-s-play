import React from "react";
import { MD3Theme, Text, TextProps } from "react-native-paper";

import { withTheme } from "../HOC";
const TextNoTheme: React.FC<TextProps & { theme: MD3Theme }> = (props) => {
  return <Text {...props} theme={props.theme} />;
};

export const MyText = withTheme(TextNoTheme);
