import React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { withTheme } from "../HOC";
const TextInputNoTheme: React.FC<TextInputProps> = (props) => {
  return <TextInput mode="outlined" {...props} />;
};

export const MyTextInput = withTheme(TextInputNoTheme);
