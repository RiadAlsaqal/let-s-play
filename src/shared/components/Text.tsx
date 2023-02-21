import React from "react";
import { Text, TextProps } from "react-native-paper";
import { MD3Theme } from "@src/shared/types";

import { withTheme } from "../HOC";
const TextNoTheme: React.FC<TextProps & { theme: MD3Theme }> = (props) => {
  return <Text {...props} theme={props.theme} />;
};

export const MyText = withTheme(TextNoTheme);
